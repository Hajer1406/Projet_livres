package com.hajer.livres_proj.restcontrollers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.hajer.livres_proj.entities.Ecrivain;
import com.hajer.livres_proj.repos.EcrivainRepository;

@RestController
@RequestMapping({"/api/ecriv"})
@CrossOrigin("*")
public class EcrivainRESTController {

    @Autowired
    EcrivainRepository ecrivainRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<Ecrivain> getAllEcrivains() {
        return ecrivainRepository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Ecrivain getEcrivainById(@PathVariable("id") Long id) {
        return ecrivainRepository.findById(id).get();
    }
}

