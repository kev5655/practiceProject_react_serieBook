package kevProject.serie_book.api;


import kevProject.serie_book.model.Serie;
import kevProject.serie_book.service.SerieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin()
public class SerieController {

    private SerieService serieService;

    @CrossOrigin()
    @PostMapping("/series/add")
    public String add(@RequestBody Serie serie){
        serieService.saveSerie(serie);
        return "Save new Serie";
    }

    @CrossOrigin()
    @GetMapping("/series")
    public List<Serie> getAllSeries(){
        return serieService.getAllSeries();
    }
}
