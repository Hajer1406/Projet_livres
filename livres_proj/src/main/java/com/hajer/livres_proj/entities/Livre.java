package com.hajer.livres_proj.entities;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Livre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLivre;
    private String titreLivre;
    private Long nombrePages;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date datePublication;

    private Double prix;

    @ManyToOne
    private Ecrivain ecrivain;

    public Livre() {
        super();
    }

    public Livre(String titreLivre, Long nombrePages, Date datePublication) {
        super();
        this.titreLivre = titreLivre;
        this.nombrePages = nombrePages;
        this.datePublication = datePublication;
    }

    public Livre(String titreLivre, Long nombrePages, Date datePublication, Double prix) {
        super();
        this.titreLivre = titreLivre;
        this.nombrePages = nombrePages;
        this.datePublication = datePublication;
        this.prix = prix;
    }

    public Livre(String titreLivre, Long nombrePages, Date datePublication, Double prix, Ecrivain ecrivain) {
        super();
        this.titreLivre = titreLivre;
        this.nombrePages = nombrePages;
        this.datePublication = datePublication;
        this.prix = prix;
        this.ecrivain = ecrivain;
    }

    public Long getIdLivre() {
        return idLivre;
    }

    public void setIdLivre(Long idLivre) {
        this.idLivre = idLivre;
    }

    public String getTitreLivre() {
        return titreLivre;
    }

    public void setTitreLivre(String titreLivre) {
        this.titreLivre = titreLivre;
    }

    public Long getNombrePages() {
        return nombrePages;
    }

    public void setNombrePages(Long nombrePages) {
        this.nombrePages = nombrePages;
    }

    public Date getDatePublication() {
        return datePublication;
    }

    public void setDatePublication(Date datePublication) {
        this.datePublication = datePublication;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Ecrivain getEcrivain() {
        return ecrivain;
    }

    public void setEcrivain(Ecrivain ecrivain) {
        this.ecrivain = ecrivain;
    }

    @Override
    public String toString() {
        return "Livre [idLivre=" + idLivre + ", titreLivre=" + titreLivre + ", nombrePages=" + nombrePages
                + ", datePublication=" + datePublication + ", prix=" + prix + ", ecrivain=" + ecrivain + "]";
    }
}
