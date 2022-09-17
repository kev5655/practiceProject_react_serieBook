package kevProject.serie_book.service;

import kevProject.serie_book.model.AppRole;
import kevProject.serie_book.model.AppUser;
import kevProject.serie_book.model.Serie;
import kevProject.serie_book.repo.AppRoleRepo;
import kevProject.serie_book.repo.AppUserRepo;
import kevProject.serie_book.repo.SerieRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AppUserServiceImpl implements AppUserService, UserDetailsService {

    private final AppUserRepo appUserRepo;
    private final AppRoleRepo appRoleRepo;
    private final SerieRepo serieRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = appUserRepo.findByUsername(username);
        if(user == null){
            log.error("User not found in the database {}", username);
            throw new UsernameNotFoundException("User not found in the database");
        }else {
            log.info("User found in the database: {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public AppUser saveAppUser(AppUser user) {
        log.info("Saving new user: {} to the database", user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return appUserRepo.save(user);
    }

    @Override
    public AppRole saveAppRole(AppRole role) {
        log.info("Saving new role {} to the database", role.getName());
        return appRoleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user username {}", roleName, username);
        AppUser user = appUserRepo.findByUsername(username);
        AppRole role = appRoleRepo.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public void addSerieToUser(String username, String serieTitle) {
        log.info("Adding Serie {} to user username {}", serieTitle, username);
        AppUser user = appUserRepo.findByUsername(username);
        Serie serie = serieRepo.findByTitle(serieTitle);
        user.getSeries().add(serie);
    }

    @Override
    public AppUser getAppUser(String username) {
        log.info("Fetching user {}", username);
        return appUserRepo.findByUsername(username);
    }

    @Override
    public List<AppUser> getAppUsers() {
        log.info("Fetching all users");
        return appUserRepo.findAll();
    }

}
