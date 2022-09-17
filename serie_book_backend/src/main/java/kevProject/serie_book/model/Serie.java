package kevProject.serie_book.model;

import lombok.*;

import javax.persistence.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Serie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private int session;
    private int episode;
    private String startDate;
    private String endDate;
    private int stars;

    @ManyToOne
    @JoinColumn(name="appUser_id", referencedColumnName = "id")
    private AppUser appUser;

}

