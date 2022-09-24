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
import java.sql.Timestamp;
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

			serieService.saveSerie(new Serie(null, "Attack On Titan", 10, 23,
					Date.valueOf("2011-01-01"), Date.valueOf("2022-02-02"),
					new java.sql.Timestamp(System.currentTimeMillis()), 4, admin));
			serieService.saveSerie(new Serie(null, "One Piece", 10, 23,
					Date.valueOf("2011-01-01"), Date.valueOf("2022-02-02"),
					new Timestamp(System.currentTimeMillis()), 4, admin));
			serieService.saveSerie(new Serie(null, "One Piece", 10, 23,
					Date.valueOf("2011-01-01"), Date.valueOf("2022-02-02"),
					new Timestamp(System.currentTimeMillis()), 4, user));
			serieService.saveSerie(new Serie(null, "CyberPunk", 10, 23,
					Date.valueOf("2011-01-01"), Date.valueOf("2022-02-02"),
					new Timestamp(System.currentTimeMillis()), 4, user));
			serieService.saveSerie(new Serie(null, "Naruto", 10, 23,
					Date.valueOf("2011-01-01"), Date.valueOf("2022-02-02"),
					new Timestamp(System.currentTimeMillis()), 4, user));
		};
	}

}
