package com.hajer.livres_proj.service;

import java.util.List;

import com.hajer.livres_proj.entities.Ecrivain;
import com.hajer.livres_proj.entities.Livre;

public interface LivreService {

    Livre saveLivre(Livre l);

    Livre updateLivre(Livre l);

    void deleteLivre(Livre l);

    void deleteLivreById(Long id);

    Livre getLivre(Long id);

    List<Livre> getAllLivres();

    // --- TP02 ---
    List<Livre> findByTitreLivre(String titre);

    List<Livre> findByTitreLivreContains(String titre);

    List<Livre> findByTitrePages(String titre, Long pages);

    List<Livre> findByEcrivain(Ecrivain ecrivain);

    List<Livre> findByEcrivainIdEcrivain(Long id);

    List<Livre> findByOrderByTitreLivreAsc();

    List<Livre> trierLivresTitresPages();
}
