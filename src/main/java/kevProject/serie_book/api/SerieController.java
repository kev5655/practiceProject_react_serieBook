package kevProject.serie_book.api;

import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.model.Serie;
import kevProject.serie_book.service.AppUserService;
import kevProject.serie_book.service.SerieService;
import kevProject.serie_book.utils.JwtUtils;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.net.URI;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Slf4j
@RestController
@CrossOrigin()
@RequestMapping("/api")
@RequiredArgsConstructor
public class SerieController {

    private final SerieService serieService;
    private final AppUserService appUserService;

    @CrossOrigin()
    @PostMapping(Url.series)
    public Collection<SerieResponse> getAllSeries(@RequestHeader Map<String, String> headers) {
        AppUser appUser = new JwtUtils().getAppUser(appUserService, headers);

        Collection<SerieResponse> serieResponses = new ArrayList<>();
        appUser.getSeries().forEach((serie) -> {
            serieResponses.add(new SerieResponse(serie));
        });
        return serieResponses;
    }

    @CrossOrigin()
    @PostMapping(Url.serieAdd)
    public ResponseEntity<SerieResponse> add(@RequestHeader Map<String, String> headers, @RequestBody Serie serie) {
        log.info("Add Serie {}", serie);
        AppUser appUser = new JwtUtils().getAppUser(appUserService, headers);
        serie.setAppUser(appUser);
        serieService.saveSerie(serie);
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api" + Url.serieAdd).toUriString());
        return ResponseEntity.created(uri).body(new SerieResponse(serie));
    }

    // ToDo Check if serie Title unique
    @PutMapping(Url.serieUpdate)
    public ResponseEntity<SerieResponse> updateSerie(@RequestHeader Map<String, String> headers, @RequestBody Serie serie) {
        //Serie updatedSerie = serieService.getSerie(serie.getId());
        Serie updatedSerie = serieService.getSerieById(serie.getId());
        AppUser appUser = new JwtUtils().getAppUser(appUserService, headers);

        updatedSerie.setTitle(serie.getTitle());
        updatedSerie.setSession(serie.getSession());
        updatedSerie.setEpisode(serie.getEpisode());
        updatedSerie.setStartDate(serie.getStartDate());
        updatedSerie.setEndDate(serie.getEndDate());
        updatedSerie.setStars(serie.getStars());
        updatedSerie.setAppUser(appUser);

        log.info("Update Serie {}", updatedSerie);
        serieService.updateSerie(updatedSerie);

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api" + Url.serieUpdate).toUriString());
        return ResponseEntity.created(uri).body(new SerieResponse(updatedSerie));
    }

    @DeleteMapping(Url.serieDelete)
    public ResponseEntity<?> deleteSerie(@RequestHeader Map<String, String> headers, @RequestBody Serie serie){
        Serie serieToDelete = serieService.getSerieById(serie.getId());
        AppUser appUser = new JwtUtils().getAppUser(appUserService, headers);
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
        else this.startDate = serie.getStartDate().toLocalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        if(serie.getEndDate() == null) this.endDate = "";
        else this.endDate = serie.getEndDate().toLocalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        this.createdDate = serie.getCreatedDate().toLocalDateTime().format(DateTimeFormatter.ofPattern(serie.getCreatedDate().toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"))));
        this.lastModifiedDate = serie.getLastModifiedDate().toLocalDateTime().format(DateTimeFormatter.ofPattern(serie.getLastModifiedDate().toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss"))));
        this.stars = serie.getStars();
        this.username = serie.getAppUser().toString();
    }
}


