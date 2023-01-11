package kevProject.serie_book.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import kevProject.serie_book.config.Secrets;
import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.service.AppUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Map;
@Slf4j
@RequiredArgsConstructor
public class JwtUtils {

    private final Secrets secrets;

    public AppUser getAppUser(AppUserService appUserService, @RequestHeader Map<String, String> headers) {
        String token = headers.get("authorization").substring(secrets.getJwt_foreword().length());
        Algorithm algorithm = Algorithm.HMAC256(secrets.getHMAC256_KEY().getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        String username = decodedJWT.getSubject();
        return appUserService.getAppUser(username);
    }

}
