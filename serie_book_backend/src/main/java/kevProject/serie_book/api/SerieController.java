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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
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
    @PostMapping(Url.serieAdd)
    public String add(@RequestHeader Map<String, String> headers, @RequestBody Serie serie){
        log.info("Add Serie {}", serie);
        AppUser appUser = new JwtUtils().getAppUser(appUserService, headers);
        serie.setAppUser(appUser);
        serieService.saveSerie(serie);
        return "Save new Serie";
    }

    @CrossOrigin()
    @PostMapping(Url.series)
    public Collection<SerieResponse> getAllSeries(@RequestHeader Map<String, String> headers){
        AppUser appUser = new JwtUtils().getAppUser(appUserService, headers);

        Collection<SerieResponse> serieResponses = new ArrayList<>();
        appUser.getSeries().forEach(serie -> {
            String uname = serie.getAppUser().getUsername();
            String createdDate = serie.getCreatedDate().toLocalDate().getDayOfMonth() + "/" + serie.getCreatedDate().toLocalDate().getMonthValue() + "/" + serie.getCreatedDate().toLocalDate().getYear();
            serieResponses.add(new SerieResponse(
                    serie.getId(),
                    serie.getTitle(),
                    serie.getSession(),
                    serie.getEpisode(),
                    serie.getStartDate(),
                    serie.getEndDate(),
                    createdDate,
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
    private String createdDate;
    private int stars;
    private String username;
}


