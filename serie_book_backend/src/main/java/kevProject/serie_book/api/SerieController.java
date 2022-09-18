package kevProject.serie_book.api;

import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.model.Serie;
import kevProject.serie_book.service.AppUserService;
import kevProject.serie_book.service.SerieService;
import kevProject.serie_book.utils.JwtUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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
    @PostMapping(Url.serieAdd)
    public ResponseEntity<SerieResponse> add(@RequestHeader Map<String, String> headers, @RequestBody Serie serie) {
        log.info("Add Serie {}", serie);
        AppUser appUser = new JwtUtils().getAppUser(appUserService, headers);
        serie.setAppUser(appUser);
        serieService.saveSerie(serie);
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api" + Url.serieAdd).toUriString());
        return ResponseEntity.created(uri).body(new SerieResponse(
                serie.getId(),
                serie.getTitle(),
                serie.getSession(),
                serie.getEpisode(),
                serie.getStartDate().toLocalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                serie.getEndDate().toLocalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                serie.getCreatedDate().toLocalDateTime().format(DateTimeFormatter.ofPattern(serie.getCreatedDate().toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")))),
                serie.getStars(),
                serie.getAppUser().getUsername()
        ));
    }

    // ToDo Check if serie Title unique
    @PutMapping(Url.serieUpdate)
    public ResponseEntity<SerieResponse> updateSerie(@RequestHeader Map<String, String> headers, @RequestBody Serie serie) {
        log.info("Update Serie {}", serie);
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

        serieService.updateSerie(updatedSerie);

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api" + Url.serieUpdate).toUriString());
        return ResponseEntity.created(uri).body(new SerieResponse(
                updatedSerie.getId(),
                updatedSerie.getTitle(),
                updatedSerie.getSession(),
                updatedSerie.getEpisode(),
                updatedSerie.getStartDate().toLocalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                updatedSerie.getEndDate().toLocalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                updatedSerie.getCreatedDate().toLocalDateTime().format(DateTimeFormatter.ofPattern(serie.getCreatedDate().toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")))),
                updatedSerie.getStars(),
                updatedSerie.getAppUser().getUsername()));
    }

    @CrossOrigin()
    @PostMapping(Url.series)
    public Collection<SerieResponse> getAllSeries(@RequestHeader Map<String, String> headers) {
        AppUser appUser = new JwtUtils().getAppUser(appUserService, headers);

        Collection<SerieResponse> serieResponses = new ArrayList<>();
        appUser.getSeries().forEach((serie) -> {
            serieResponses.add(new SerieResponse(
                    serie.getId(),
                    serie.getTitle(),
                    serie.getSession(),
                    serie.getEpisode(),
                    serie.getStartDate().toLocalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                    serie.getEndDate().toLocalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                    serie.getCreatedDate().toLocalDateTime().format(DateTimeFormatter.ofPattern(serie.getCreatedDate().toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss")))),
                    serie.getStars(),
                    serie.getAppUser().getUsername()));
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
    private String createdDate;
    private int stars;
    private String username;
}


