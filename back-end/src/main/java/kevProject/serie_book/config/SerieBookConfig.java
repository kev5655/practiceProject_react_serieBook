package kevProject.serie_book.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j(topic = "test")
@Configuration
public class SerieBookConfig {

    @Bean
    Secrets secrets (@Value("${security.access_jwt_lifetime}") Long accessJwtLifetime,
                     @Value("${security.refresh_jwt_lifetime}") Long refreshJwtLifetime,
                     @Value("${security.jwt_foreword}") String jwtForeword,
                     @Value("${security.HMAC256_KEY}") String HMAC256Key){
        Secrets secrets = new Secrets(accessJwtLifetime, refreshJwtLifetime, HMAC256Key, jwtForeword);
        return secrets;
    }

}
