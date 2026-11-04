import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Livre } from '../model/livre.model';
import { Ecrivain } from '../model/ecrivain.model';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-add-livre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-livre.html',
  styleUrl: './add-livre.css',
})
export class AddLivre implements OnInit {
  newLivre = new Livre();
  ecrivains: Ecrivain[] = [];
  newIdEcrivain!: number;
  newEcrivain!: Ecrivain;

  constructor(
    private livreService: LivreService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.livreService.listeEcrivains().subscribe({
      next: (ecrivs) => {
        console.log(ecrivs);
        this.ecrivains = ecrivs._embedded.ecrivains;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des écrivains :', err);
      },
    });
  }

  addLivre(): void {
    if (this.newIdEcrivain) {
      this.newEcrivain = this.ecrivains.find(
        (ecriv) => ecriv.idEcrivain == this.newIdEcrivain
      )!;
      this.newLivre.ecrivain = this.newEcrivain;
    }
    if (!this.newLivre.idLivre) {
      delete this.newLivre.idLivre;
    }
    this.livreService.ajouterLivre(this.newLivre).subscribe({
      next: (livre) => {
        console.log(livre);
        this.router.navigate(['livres']);
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout du livre :", err);
      },
    });
  }
}

export { AddLivre as AddLivreComponent };
