package com.hajer.livres_proj.repos;

import com.hajer.livres_proj.entities.Ecrivain;
import com.hajer.livres_proj.entities.Livre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RepositoryRestResource(path = "rest")
@CrossOrigin("http://localhost:4200/")
public interface LivreRepository extends JpaRepository<Livre, Long> {

    List<Livre> findByTitreLivre(String titre);

    List<Livre> findByTitreLivreContains(String titre);

    @Query("select l from Livre l where l.titreLivre like %:titre and l.nombrePages > :pages")
    List<Livre> findByTitrePages(@Param("titre") String titre,
                                 @Param("pages") Long pages);

    @Query("select l from Livre l where l.ecrivain = ?1")
    List<Livre> findByEcrivain(Ecrivain ecrivain);

    List<Livre> findByEcrivainIdEcrivain(Long id);

    List<Livre> findByOrderByTitreLivreAsc();

    @Query("select l from Livre l order by l.titreLivre ASC, l.nombrePages DESC")
    List<Livre> trierLivresTitresPages();
}
