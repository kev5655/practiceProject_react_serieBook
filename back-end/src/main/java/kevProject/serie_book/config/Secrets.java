package kevProject.serie_book.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Secrets {

    @Getter
    private final Long access_jwt_lifetime;
    @Getter
    private final Long refresh_jwt_lifetime;
    @Getter
    private final String HMAC256_KEY;

    private final String jwt_foreword;

    public String getJwt_foreword() {
        return jwt_foreword + " ";
    }
}
