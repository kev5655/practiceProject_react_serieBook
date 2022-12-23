package kevProject.serie_book.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;

import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppUser {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String username; // unique
    private String email; // unique
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<AppRole> roles = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "appUser")
    @ToString.Exclude
    private Collection<Serie> series = new HashSet<>();


}
