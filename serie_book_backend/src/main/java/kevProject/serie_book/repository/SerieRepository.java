package kevProject.serie_book.repository;

import kevProject.serie_book.model.Serie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SerieRepository extends JpaRepository<Serie, Integer> {

    Serie save(Serie serie);
}
