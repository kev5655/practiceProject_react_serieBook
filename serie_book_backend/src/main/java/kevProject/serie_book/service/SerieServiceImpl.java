package kevProject.serie_book.service;

import kevProject.serie_book.model.Serie;
import kevProject.serie_book.repository.SerieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SerieServiceImpl implements SerieService {

    @Autowired
    private SerieRepository serieRepository;


    @Override
    public Serie saveSerie(Serie serie) {
        return null;
    }

    @Override
    public List<Serie> getAllSeries() {
        return null;
    }
}
