package com.hajer.livres_proj.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "titreLiv", types = { Livre.class })
public interface LivreProjection {
    public String getTitreLivre();
}
