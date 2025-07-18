package kevProject.serie_book.api;

import kevProject.serie_book.config.Secrets;
import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.model.Serie;
import kevProject.serie_book.service.AppUserService;
import kevProject.serie_book.service.SerieService;
import kevProject.serie_book.utils.JwtUtils;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SerieController {

    private final SerieService serieService;
    private final AppUserService appUserService;
    private final Secrets secrets;

    @CrossOrigin()
    @PostMapping(Url.series)
    public Collection<SerieResponse> getAllSeries(@RequestHeader Map<String, String> headers) {
        AppUser appUser = new JwtUtils(secrets).getAppUser(appUserService, headers);

        Collection<SerieResponse> serieResponses = new ArrayList<>();
        appUser.getSeries().forEach((serie) -> serieResponses.add(new SerieResponse(serie)));
        log.info("User gets allSeries the user is {}", appUser);
        return serieResponses;
    }

    @CrossOrigin()
    @PostMapping(Url.serieAdd)
    public ResponseEntity<SerieResponse> add(@RequestHeader Map<String, String> headers, @RequestBody Serie serie) {
        AppUser appUser = new JwtUtils(secrets).getAppUser(appUserService, headers);
        serie.setAppUser(appUser);
        serieService.saveSerie(serie);
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api" + Url.serieAdd).toUriString());
        log.info("User adds a serie, serie is {}", serie);
        return ResponseEntity.created(uri).body(new SerieResponse(serie));
    }

    // ToDo Check if serie Title unique
    @PutMapping(Url.serieUpdate)
    public ResponseEntity<SerieResponse> updateSerie(@RequestHeader Map<String, String> headers, @RequestBody Serie serie) {
        //Serie updatedSerie = serieService.getSerie(serie.getId());
        Serie updatedSerie = serieService.getSerieById(serie.getId());
        AppUser appUser = new JwtUtils(secrets).getAppUser(appUserService, headers);

        updatedSerie.setTitle(serie.getTitle());
        updatedSerie.setSession(serie.getSession());
        updatedSerie.setEpisode(serie.getEpisode());
        updatedSerie.setStartDate(serie.getStartDate());
        updatedSerie.setEndDate(serie.getEndDate());
        updatedSerie.setStars(serie.getStars());
        updatedSerie.setLastModifiedDate(serie.getLastModifiedDate());
        updatedSerie.setAppUser(appUser);

        log.info("User update a serie, serie is {}", updatedSerie);
        serieService.updateSerie(updatedSerie);

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api" + Url.serieUpdate).toUriString());
        return ResponseEntity.created(uri).body(new SerieResponse(updatedSerie));
    }

    @DeleteMapping(Url.serieDelete)
    public ResponseEntity<?> deleteSerie(@RequestHeader Map<String, String> headers, @RequestBody Serie serie){
        Serie serieToDelete = serieService.getSerieById(serie.getId());
        AppUser appUser = new JwtUtils(secrets).getAppUser(appUserService, headers);
        log.info("Delete Serie {} from user {}", serie, appUser.getUsername());

        serieService.deleteSerie(serieToDelete.getId());
        return ResponseEntity.ok().build();
    }


}

@Setter
@Getter
@AllArgsConstructor
@ToString

class SerieResponse {
    private Long id;
    private String title;
    private int session;
    private int episode;
    private String startDate;
    private String endDate;
    private String createdDate;
    private String lastModifiedDate;
    private int stars;
    private String username;

    public SerieResponse(Serie serie){
        this.id = serie.getId();
        this.title = serie.getTitle();
        this.session = serie.getSession();
        this.episode = serie.getEpisode();
        if(serie.getStartDate() == null) this.startDate = "";
        else this.startDate = String.valueOf(serie.getStartDate().getTime());
        if(serie.getEndDate() == null) this.endDate = "";
        else this.endDate = String.valueOf(serie.getEndDate().getTime());
        this.createdDate = String.valueOf(serie.getCreatedDate().getTime());
        this.lastModifiedDate = String.valueOf(serie.getLastModifiedDate().getTime());
        this.stars = serie.getStars();
    }
}


