package kevProject.serie_book.repo;

import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.model.Serie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;


public interface AppUserRepo extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
}
