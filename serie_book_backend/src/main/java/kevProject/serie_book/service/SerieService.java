package kevProject.serie_book.service;

import kevProject.serie_book.model.Serie;
import java.util.List;

public interface SerieService {

    public Serie saveSerie(Serie serie);
    public List<Serie> getAllSeries();

}
