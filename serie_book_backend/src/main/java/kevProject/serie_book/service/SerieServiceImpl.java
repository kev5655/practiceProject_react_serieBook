package kevProject.serie_book.service;

import kevProject.serie_book.model.Serie;
import kevProject.serie_book.repository.SerieRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Slf4j
@RequiredArgsConstructor
@Service
public class SerieServiceImpl implements SerieService {

    private final SerieRepository serieRepository;


    @Override
    public Serie saveSerie(Serie serie) {
        return serieRepository.save(serie);
    }

    @Override
    public List<Serie> getAllSeries() {
        return serieRepository.findAll();
    }
}
