package com.hajer.livres_proj;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import com.hajer.livres_proj.entities.Ecrivain;
import com.hajer.livres_proj.entities.Livre;

@SpringBootApplication
public class LivresProjApplication implements CommandLineRunner {

    @Autowired
    private RepositoryRestConfiguration repositoryRestConfiguration;

    public static void main(String[] args) {
        SpringApplication.run(LivresProjApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Expose IDs in Spring Data REST responses
        repositoryRestConfiguration.exposeIdsFor(Livre.class, Ecrivain.class);
    }
}
