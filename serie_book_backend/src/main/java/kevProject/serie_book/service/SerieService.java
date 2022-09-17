package kevProject.serie_book.service;

import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.model.Serie;
import java.util.List;

public interface SerieService {

    public void saveSerie(Serie serie);
    public Serie getSerie(String title);
    List<Serie> getAllSeries(String username);
}
