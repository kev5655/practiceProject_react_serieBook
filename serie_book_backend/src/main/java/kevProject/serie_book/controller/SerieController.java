package kevProject.serie_book.controller;


import kevProject.serie_book.model.Serie;
import kevProject.serie_book.service.SerieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/series")
@CrossOrigin
public class SerieController {

    @Autowired
    private SerieService serieService;

    @PostMapping("/add")
    public String add(@RequestBody Serie serie){
        serieService.saveSerie(serie);
        return "Save new Serie";
    }

    @GetMapping("/getAll")
    public List<Serie> getAllSeries(){
        return serieService.getAllSeries();
    }
}
