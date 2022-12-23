package kevProject.serie_book.repo;

import kevProject.serie_book.model.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AppRoleRepo extends JpaRepository<AppRole, Long> {
    AppRole findByName(String roleName);

}
