package kevProject.serie_book.service;

import kevProject.serie_book.model.Serie;
import kevProject.serie_book.repo.SerieRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class SerieServiceImpl implements SerieService {

    private final SerieRepo serieRepo;

    @Override
    public void saveSerie(Serie serie) {
        serieRepo.save(serie);
    }

    @Override
    public void updateSerie(Serie serie) {
        serieRepo.save(serie);
    }

    @Override
    public void deleteSerie(Long id) {
        serieRepo.deleteById(id);
    }

    @Override
    public Serie getSerie(String title) {
        return serieRepo.findByTitle(title);
    }

    @Override
    public Serie getSerieById(Long id) {
        return serieRepo.findById(id);
    }

    @Override
    public List<Serie> getAllSeries(String username) {
        return serieRepo.findAll();
    }

}
