import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livre } from '../model/livre.model';
import { Ecrivain } from '../model/ecrivain.model';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-update-livre',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-livre.html',
  styles: ``,
})
export class UpdateLivre implements OnInit {
  currentLivre = new Livre();
  ecrivains: Ecrivain[] = [];
  updatedEcrivainId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private livreService: LivreService,
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

    this.livreService
      .consulterLivre(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (livre) => {
          this.currentLivre = livre;
          this.updatedEcrivainId = this.currentLivre.ecrivain?.idEcrivain!;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Erreur lors de la consultation du livre :', err);
        },
      });
  }

  updateLivre(): void {
    this.currentLivre.ecrivain = this.ecrivains.find(
      (ecriv) => ecriv.idEcrivain == this.updatedEcrivainId
    )!;
    this.livreService.updateLivre(this.currentLivre).subscribe({
      next: (livre) => {
        console.log(livre);
        this.router.navigate(['livres']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du livre :', err);
      },
    });
  }
}

export { UpdateLivre as UpdateLivreComponent };
