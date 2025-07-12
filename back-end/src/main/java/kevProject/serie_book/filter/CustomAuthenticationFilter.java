package kevProject.serie_book.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import kevProject.serie_book.config.Secrets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
@RequiredArgsConstructor
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final Secrets secrets;

    public final String AUTHORITIES_NAME = "roles";

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        log.info("User trying to log in");
        try {
            // Read JSON from request body
            ObjectMapper objectMapper = new ObjectMapper();

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

            log.info("Authentication attempt with username: {}", username);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
                    password);
            return authenticationManager.authenticate(authenticationToken);
        } catch (IOException e) {
            log.error("Error parsing authentication request", e);
            throw new AuthenticationException("Failed to parse authentication request") {
                @Override
                public String getMessage() {
                    return "Failed to parse JSON credentials";
                }
            };
        } catch (IllegalArgumentException e) {
            log.error("Invalid authentication data: {}", e.getMessage());
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
        log.info("User is logged in, generating JWT tokens");
        User user = (User) authentication.getPrincipal();
        log.debug("Authenticated user: {}", user.getUsername());
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
        log.info("Could not log in: {}", failed.getMessage());

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
