package kevProject.serie_book.repo;

import kevProject.serie_book.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AppUserRepo extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
}
