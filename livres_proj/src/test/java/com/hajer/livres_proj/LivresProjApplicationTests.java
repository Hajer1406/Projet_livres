package com.hajer.livres_proj;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hajer.livres_proj.entities.Ecrivain;
import com.hajer.livres_proj.entities.Livre;
import com.hajer.livres_proj.repos.LivreRepository;

@SpringBootTest
class LivresProjApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	private LivreRepository livreRepository;

	@Test
	public void testCreateLivre() {
		Livre liv = new Livre("Le Petit Prince", 120L, new Date());
		livreRepository.save(liv);
	}

	@Test
	public void testFindLivre() {
		Livre l = livreRepository.findById(5L).get();
		System.out.println(l);
	}

	@Test
	public void testUpdateLivre() {
		Livre l = livreRepository.findById(6L).get();
		l.setNombrePages(150L);
		livreRepository.save(l);
	}

	@Test
	public void testDeleteLivre() {
		livreRepository.deleteById(9L);
	}

	@Test
	public void testListerTousLivres() {
		List<Livre> livs = livreRepository.findAll();
		for (Livre l : livs) {
			System.out.println(l);
		}
	}

	@Test
	public void testFindByTitreLivre() {
		List<Livre> livs = livreRepository.findByTitreLivre("Le Petit Prince");
		for (Livre l : livs) {
			System.out.println(l);
		}
	}

	@Test
	public void testFindByTitreLivreContains() {
		List<Livre> livs = livreRepository.findByTitreLivreContains("Prince");
		for (Livre l : livs) {
			System.out.println(l);
		}
	}

	@Test
	public void testfindByTitrePages() {
		List<Livre> livs = livreRepository.findByTitrePages("Prince", 100L);
		for (Livre l : livs) {
			System.out.println(l);
		}
	}

	@Test
	public void testfindByEcrivain() {
		Ecrivain ecriv = new Ecrivain();
		ecriv.setIdEcrivain(1L);
		List<Livre> livs = livreRepository.findByEcrivain(ecriv);
		for (Livre l : livs) {
			System.out.println(l);
		}
	}

	@Test
	public void findByEcrivainIdEcrivain() {
		List<Livre> livs = livreRepository.findByEcrivainIdEcrivain(1L);
		for (Livre l : livs) {
			System.out.println(l);
		}
	}

	@Test
	public void testfindByOrderByTitreLivreAsc() {
		List<Livre> livs = livreRepository.findByOrderByTitreLivreAsc();
		for (Livre l : livs) {
			System.out.println(l);
		}
	}

	@Test
	public void testTrierLivresTitresPages() {
		List<Livre> livs = livreRepository.trierLivresTitresPages();
		for (Livre l : livs) {
			System.out.println(l);
		}
	}

}
