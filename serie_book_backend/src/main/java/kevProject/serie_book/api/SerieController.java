package kevProject.serie_book.api;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.model.Serie;
import kevProject.serie_book.service.AppUserService;
import kevProject.serie_book.service.SerieService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin()
@RequestMapping("/api")
@RequiredArgsConstructor
public class SerieController {

    private final SerieService serieService;
    private final AppUserService appUserService;

    @CrossOrigin()
    @PostMapping("/serie/add")
    public String add(@RequestBody Serie serie){
        serieService.saveSerie(serie);
        return "Save new Serie";
    }

    @CrossOrigin()
    @PostMapping("/series")
    public Collection<SerieResponse> getAllSeries(@RequestHeader Map<String, String> headers){
        String token = headers.get("authorization").substring("Bearer ".length());
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(token);
        String username = decodedJWT.getSubject();
        log.info("username {} and toke {}", username, token);
        AppUser appUser = appUserService.getAppUser(username);

        Collection<SerieResponse> serieResponses = new ArrayList<>();
        appUser.getSeries().forEach(serie -> {
            String uname = serie.getAppUser().getUsername();
            serieResponses.add(new SerieResponse(
                    serie.getId(),
                    serie.getTitle(),
                    serie.getSession(),
                    serie.getEpisode(),
                    serie.getStartDate(),
                    serie.getEndDate(),
                    serie.getStars(),
                    uname));
        });
        return serieResponses;
    }
}

@Data
@AllArgsConstructor
class SerieResponse {
    private Long id;
    private String title;
    private int session;
    private int episode;
    private String startDate;
    private String endDate;
    private int stars;
    private String username;
}


