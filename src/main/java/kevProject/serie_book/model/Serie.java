package kevProject.serie_book.model;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;


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
    private Date startDate;
    private Date endDate;
    private Timestamp createdDate;
    private int stars;

    @ManyToOne
    @JoinColumn(name="appUser_id", referencedColumnName = "id")
    private AppUser appUser;

}
