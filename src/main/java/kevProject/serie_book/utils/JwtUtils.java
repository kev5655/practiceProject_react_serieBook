package kevProject.serie_book.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.security.SecurityVariables;
import kevProject.serie_book.service.AppUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Map;
@Slf4j
public class JwtUtils {

    public AppUser getAppUser(AppUserService appUserService, @RequestHeader Map<String, String> headers) {
        String token = headers.get("authorization").substring(SecurityVariables.JWT_FOREWORD.length());
        Algorithm algorithm = Algorithm.HMAC256(SecurityVariables.HMAC256_KEY.getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        String username = decodedJWT.getSubject();
        //log.info("username {} and toke {}", username, token); //ToDo Remove Logging for Production
        return appUserService.getAppUser(username);
    }

}
