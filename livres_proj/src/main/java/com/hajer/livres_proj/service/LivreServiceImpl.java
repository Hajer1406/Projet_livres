package com.hajer.livres_proj.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hajer.livres_proj.entities.Ecrivain;
import com.hajer.livres_proj.entities.Livre;
import com.hajer.livres_proj.repos.LivreRepository;

@Service
public class LivreServiceImpl implements LivreService {

    @Autowired
    LivreRepository livreRepository;

    @Override
    public Livre saveLivre(Livre l) {
        return livreRepository.save(l);
    }

    @Override
    public Livre updateLivre(Livre l) {
        return livreRepository.save(l);
    }

    @Override
    public void deleteLivre(Livre l) {
        livreRepository.delete(l);
    }

    @Override
    public void deleteLivreById(Long id) {
        livreRepository.deleteById(id);
    }

    @Override
    public Livre getLivre(Long id) {
        return livreRepository.findById(id).get();
    }

    @Override
    public List<Livre> getAllLivres() {
        return livreRepository.findAll();
    }

    // --- TP02 ---

    @Override
    public List<Livre> findByTitreLivre(String titre) {
        return livreRepository.findByTitreLivre(titre);
    }

    @Override
    public List<Livre> findByTitreLivreContains(String titre) {
        return livreRepository.findByTitreLivreContains(titre);
    }

    @Override
    public List<Livre> findByTitrePages(String titre, Long pages) {
        return livreRepository.findByTitrePages(titre, pages);
    }

    @Override
    public List<Livre> findByEcrivain(Ecrivain ecrivain) {
        return livreRepository.findByEcrivain(ecrivain);
    }

    @Override
    public List<Livre> findByEcrivainIdEcrivain(Long id) {
        return livreRepository.findByEcrivainIdEcrivain(id);
    }

    @Override
    public List<Livre> findByOrderByTitreLivreAsc() {
        return livreRepository.findByOrderByTitreLivreAsc();
    }

    @Override
    public List<Livre> trierLivresTitresPages() {
        return livreRepository.trierLivresTitresPages();
    }
}