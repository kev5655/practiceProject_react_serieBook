package kevProject.serie_book.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Serie {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;
    private String title;
    private int session;
    private int episode;
    private Date startDate;
    private Date endDate;
    private Timestamp createdDate;
    private Timestamp lastModifiedDate;
    private int stars;

    @ManyToOne
    @JoinColumn(name="appUser_id", referencedColumnName = "id")
    private AppUser appUser;

}

