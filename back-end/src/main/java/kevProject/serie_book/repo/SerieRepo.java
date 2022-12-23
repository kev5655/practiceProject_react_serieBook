package kevProject.serie_book.repo;

import kevProject.serie_book.model.Serie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SerieRepo extends JpaRepository<Serie, Integer> {
    Serie findByTitle(String title);
    Serie findById(Long id);
    void deleteById(Long id);

}
