package com.hajer.livres_proj.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Ecrivain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEcrivain;

    private String nomEcrivain;

    private String prenomEcrivain;

    @JsonIgnore
    @OneToMany(mappedBy = "ecrivain")
    private List<Livre> livres;

}
