package kevProject.serie_book.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import kevProject.serie_book.config.Secrets;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RequiredArgsConstructor
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // Create an explicit logger instead of using Lombok's @Slf4j
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(CustomAuthenticationFilter.class);

    private final AuthenticationManager authenticationManager;
    private final Secrets secrets;

    public final String AUTHORITIES_NAME = "roles";

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        // Continue with normal info level logging
        log.info("Login attempt received from IP: {}", request.getRemoteAddr());
        log.info("Content-Type: {}", request.getContentType());
        log.info("Request method: {}", request.getMethod());

        try {
            // Read JSON from request body
            ObjectMapper objectMapper = new ObjectMapper();
            log.info("Parsing JSON authentication request");

            // Use TypeReference for type safety
            Map<String, String> credentials = objectMapper.readValue(
                    request.getInputStream(),
                    new com.fasterxml.jackson.core.type.TypeReference<Map<String, String>>() {
                    });

            String username = credentials.get("username");
            String password = credentials.get("password");

            if (username == null || password == null) {
                throw new IllegalArgumentException("Username or password is missing in request");
            }

            // WARNING: Logging passwords is a security risk - only use this for debugging
            // and remove in production
            log.info("Authentication attempt - Username: {}, Password: {}", username, password);
            log.info("Received JSON credentials: {}", credentials);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
                    password);
            return authenticationManager.authenticate(authenticationToken);
        } catch (IOException e) {
            log.error("Error parsing authentication request - Exception: {}", e.getMessage(), e);
            log.error("Request content type: {}", request.getContentType());
            log.error("Request character encoding: {}", request.getCharacterEncoding());
            throw new AuthenticationException("Failed to parse authentication request") {
                @Override
                public String getMessage() {
                    return "Failed to parse JSON credentials: " + e.getMessage();
                }
            };
        } catch (IllegalArgumentException e) {
            log.error("Invalid authentication data: {}", e.getMessage());
            log.error("Authentication request was missing required fields");
            throw new AuthenticationException("Invalid authentication data") {
                @Override
                public String getMessage() {
                    return e.getMessage();
                }
            };
        }
    }

    // ToDo Refactoring
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authentication) throws IOException, ServletException {
        log.info("Authentication successful - generating JWT tokens");
        User user = (User) authentication.getPrincipal();
        log.info("Authenticated user: {}", user.getUsername());
        log.info("User roles: {}", user.getAuthorities());
        log.info("Login successful from IP: {}", request.getRemoteAddr());
        Algorithm algorithm = Algorithm.HMAC256(secrets.getHMAC256_KEY().getBytes());
        String access_token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + secrets.getAccess_jwt_lifetime()))
                .withIssuer(request.getRequestURI())
                .withClaim(AUTHORITIES_NAME,
                        user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);

        String refresh_token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + secrets.getRefresh_jwt_lifetime()))
                .withIssuer(request.getRequestURI())
                .withClaim(AUTHORITIES_NAME,
                        user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", access_token);
        tokens.put("refresh_token", refresh_token);
        tokens.put("lifetime", String.valueOf(secrets.getAccess_jwt_lifetime()));
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);

    }

    // ToDo brute force attack abfragen
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        log.error("Authentication failed: {}", failed.getMessage());
        log.error("Failed login attempt from IP: {}", request.getRemoteAddr());
        log.error("Authentication failure details: {}", failed);

        // Set response status
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // Return error as JSON
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Authentication failed");
        errorResponse.put("message", failed.getMessage());
        errorResponse.put("timestamp", String.valueOf(System.currentTimeMillis()));

        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), errorResponse);
    }
}
