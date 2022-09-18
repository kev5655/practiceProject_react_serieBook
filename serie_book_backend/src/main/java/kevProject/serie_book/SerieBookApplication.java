package kevProject.serie_book;

import kevProject.serie_book.model.AppRole;
import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.model.Serie;
import kevProject.serie_book.service.AppUserService;
import kevProject.serie_book.service.SerieService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;

@SpringBootApplication
public class SerieBookApplication {

	public static void main(String[] args) {
		SpringApplication.run(SerieBookApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(SerieService serieService, AppUserService appUserService) {
		return args -> {
			appUserService.saveAppRole(new AppRole(null, "ROLE_ADMIN"));
			appUserService.saveAppRole(new AppRole(null, "ROLE_USER"));

			AppUser admin = new AppUser(null, "admin", "admin@admin.com", "1234", new ArrayList<>(), new ArrayList<>());
			AppUser user = new AppUser(null, "kevin", "kevin@kevin.com", "1234", new ArrayList<>(), new ArrayList<>());
			appUserService.saveAppUser(admin);
			appUserService.saveAppUser(user);
			appUserService.addRoleToUser("admin", "ROLE_USER");
			appUserService.addRoleToUser("admin", "ROLE_ADMIN");
			appUserService.addRoleToUser("kevin", "ROLE_USER");

			serieService.saveSerie(new Serie(null, "Admin Attack On Titan", 10, 23, "01/01/2011", "02/02/2022", new java.sql.Date(System.currentTimeMillis()), 4, admin));
			serieService.saveSerie(new Serie(null, "Admin Kevin One Piece", 10, 23, "01/01/2011", "02/02/2022", new java.sql.Date(System.currentTimeMillis()), 4, admin));
			serieService.saveSerie(new Serie(null, "Admin Kevin One Piece", 10, 23, "01/01/2011", "02/02/2022", new java.sql.Date(System.currentTimeMillis()), 4, user));
			serieService.saveSerie(new Serie(null, "Kevin CyberPunk", 10, 23, "01/01/2011", "02/02/2022", new java.sql.Date(System.currentTimeMillis()), 4, user));
			serieService.saveSerie(new Serie(null, "Kevin One Naruto", 10, 23, "01/01/2011", "02/02/2022", new java.sql.Date(System.currentTimeMillis()), 4, user));
		};
	}

}
