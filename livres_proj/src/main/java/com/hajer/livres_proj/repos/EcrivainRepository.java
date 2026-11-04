package com.hajer.livres_proj.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.hajer.livres_proj.entities.Ecrivain;

@RepositoryRestResource(path = "ecriv")
@CrossOrigin("http://localhost:4200/") // pour autoriser angular
public interface EcrivainRepository extends JpaRepository<Ecrivain, Long> {
}

