package kevProject.serie_book.component;

import kevProject.serie_book.model.AppRole;
import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.model.Serie;
import kevProject.serie_book.service.AppUserService;
import kevProject.serie_book.service.SerieService;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;

@AllArgsConstructor
@Component
@Profile("default")
@ConditionalOnProperty(name = "app.init-db", havingValue = "true")
public class DevBean implements CommandLineRunner {

    private final AppUserService appUserService;
    private final SerieService serieService;


    @Override
    public void run(String... args) throws Exception {
        appUserService.saveAppRole(new AppRole(null, "ROLE_ADMIN"));
        appUserService.saveAppRole(new AppRole(null, "ROLE_USER"));
        AppUser admin = new AppUser(null, "admin", "admin@admin.com", "1234", new ArrayList<>(), new ArrayList<>());
        AppUser user = new AppUser(null, "kevin", "kevin@kevin.com", "1234", new ArrayList<>(), new ArrayList<>());
        AppUser fabienne = new AppUser(null, "fabienne", "kevin@kevin.com", "1234", new ArrayList<>(), new ArrayList<>());
        appUserService.saveAppUser(admin);
        appUserService.saveAppUser(user);
        appUserService.saveAppUser(fabienne);
        appUserService.addRoleToUser("admin", "ROLE_USER");
        appUserService.addRoleToUser("admin", "ROLE_ADMIN");
        appUserService.addRoleToUser("kevin", "ROLE_USER");
        appUserService.addRoleToUser("fabienne", "ROLE_USER");

        serieService.saveSerie(new Serie(null, "Attack On Titan", 4, 33,
                Date.valueOf("2011-01-01"), Date.valueOf("2022-02-02"),
                new Timestamp(System.currentTimeMillis()),
                new Timestamp(System.currentTimeMillis()), 4, admin));
        serieService.saveSerie(new Serie(null, "One Piece", 15, 989,
                Date.valueOf("2011-01-01"), Date.valueOf("2022-02-02"),
                new Timestamp(System.currentTimeMillis()),
                new Timestamp(System.currentTimeMillis()), 4, admin));
        serieService.saveSerie(new Serie(null, "Game Of Thrones", 8, 73,
                Date.valueOf("2011-01-01"), Date.valueOf("2022-02-02"),
                new Timestamp(System.currentTimeMillis()),
                new Timestamp(System.currentTimeMillis()), 4, user));
        serieService.saveSerie(new Serie(null, "Sherlock", 4, 14,
                Date.valueOf("2011-01-01"), Date.valueOf("2022-02-02"),
                new Timestamp(System.currentTimeMillis()),
                new Timestamp(System.currentTimeMillis()), 3, user));
        serieService.saveSerie(new Serie(null, "Chernobyl", 1, 5,
                Date.valueOf("2011-01-01"), Date.valueOf("2022-02-02"),
                new Timestamp(System.currentTimeMillis()),
                new Timestamp(System.currentTimeMillis()), 2, user));
    }
}
