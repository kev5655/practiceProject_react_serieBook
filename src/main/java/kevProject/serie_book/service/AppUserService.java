package kevProject.serie_book.service;

import kevProject.serie_book.model.AppRole;
import kevProject.serie_book.model.AppUser;

import java.util.List;

public interface AppUserService {

    AppUser saveAppUser(AppUser user);
    AppRole saveAppRole(AppRole role);
    void addRoleToUser(String username, String roleName);
    void addSerieToUser(String username, String serieTitle);
    AppUser getAppUser(String username);
    List<AppUser> getAppUsers();

}
