package kevProject.serie_book.api;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import kevProject.serie_book.config.Secrets;
import kevProject.serie_book.model.AppRole;
import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.service.AppUserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
@RestController
@RequestMapping(Url.api)
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;
    private final Secrets secrets;

    @GetMapping(Url.users)
    public ResponseEntity<List<AppUser>> getUsers() {
        return ResponseEntity.ok().body(appUserService.getAppUsers());
    }

    @PostMapping(Url.userSave)
    public ResponseEntity<?> saveUsers(@RequestBody AppUser user, HttpServletResponse response) throws IOException {
        URI uri = URI.create(
                ServletUriComponentsBuilder.fromCurrentContextPath().path(Url.api + Url.userSave).toUriString());
        AppUser appUser = appUserService.saveAppUser(user);
        if (appUser == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error_message", HttpStatus.UNAUTHORIZED.toString());
            response.setContentType(APPLICATION_JSON_VALUE);
            new ObjectMapper().writeValue(response.getOutputStream(), error);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
        log.info("Save a new User username is {}", user.getUsername());
        appUserService.addRoleToUser(user.getUsername(), "ROLE_USER");

        return ResponseEntity.created(uri).body(appUser);
    }

    @PostMapping(Url.userAvailable)
    public ResponseEntity<?> isUserAvailable(@RequestBody userAvailableForm from) {
        AppUser appUser = appUserService.getAppUser(from.getUsername());
        log.info("isUserAvailable: {} {}", from.getUsername(), appUser == null ? "yes" : "no");
        Map<String, Boolean> body = new HashMap<>();
        body.put("isUserAvailable", appUser == null);
        return ResponseEntity.ok().body(body);
    }

    @PostMapping(Url.roleSave)
    public ResponseEntity<AppRole> saveRole(@RequestBody AppRole role) {
        URI uri = URI.create(
                ServletUriComponentsBuilder.fromCurrentContextPath().path(Url.api + Url.roleSave).toUriString());
        if (role.isValid()) {
            log.info("Save a new Role role is {}", role);
            return ResponseEntity.created(uri).body(appUserService.saveAppRole(role));
        } else {
            log.error("Role is not valid role is: {}", role);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(Url.roleAddtouser)
    public ResponseEntity<?> saveRole(@RequestBody RoleToUserFrom form) {
        appUserService.addRoleToUser(form.getUsername(), form.getRolename());
        log.info("Add a role to User user is {} role is {}", form.getUsername(), form.getRolename());
        return ResponseEntity.ok().build();
    }

    @PostMapping(Url.tokenRefresh)
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);

        if (authorizationHeader != null && authorizationHeader.startsWith(secrets.getJwt_foreword())) {
            try {
                String refresh_token = authorizationHeader.substring(secrets.getJwt_foreword().length());
                Algorithm algorithm = Algorithm.HMAC256(secrets.getHMAC256_KEY().getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                AppUser user = appUserService.getAppUser(username);

                String access_token = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + secrets.getAccess_jwt_lifetime()))
                        .withIssuer(request.getRequestURI())
                        .withClaim("roles", user.getRoles().stream().map(AppRole::getName).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                tokens.put("lifetime", String.valueOf(secrets.getAccess_jwt_lifetime()));
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);

            } catch (Exception exception) {
                log.error("Error with the refreshToken user try to refresh his accessToken, error message: {}",
                        exception.getMessage());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            log.error("User try to Refresh the JWT but they have no refreshToken");
            throw new RuntimeException("Refresh Token is missing");
        }
    }
}

@Data
class RoleToUserFrom {
    private String username;
    private String rolename;
}

@Data
class userAvailableForm {
    private String username;
}
