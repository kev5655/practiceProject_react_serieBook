package kevProject.serie_book.service;

import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.model.Serie;
import java.util.List;

public interface SerieService {

    void saveSerie(Serie serie);
    void updateSerie(Serie serie);
    void deleteSerie(Long id);
    Serie getSerie(String title);
    Serie getSerieById(Long id);
    List<Serie> getAllSeries(String username);
}
