import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ecrivain } from '../model/ecrivain.model';
import { LivreService } from '../services/livre.service';
import { UpdateEcrivain } from '../update-ecrivain/update-ecrivain';

@Component({
  selector: 'app-liste-ecrivains',
  standalone: true,
  imports: [CommonModule, UpdateEcrivain],
  styles: ``,
  template: `
<div class="container mt-4">
  <!-- Composant enfant UpdateEcrivain -->
  <div class="col-sm-6 col-md-6 mb-4">
    <app-update-ecrivain
      [ecrivain]="updatedEcriv"
      (ecrivainUpdated)="ecrivainUpdated($event)"
      [ajout]="ajout"
    ></app-update-ecrivain>
  </div>

  <!-- Table des écrivains -->
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h5 class="m-0 font-weight-bold text-primary">Liste des Écrivains</h5>
    </div>
    <div class="card-body">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          @for (ecriv of ecrivains; track ecriv.idEcrivain) {
            <tr>
              <td>{{ ecriv.idEcrivain }}</td>
              <td>{{ ecriv.prenomEcrivain }}</td>
              <td>{{ ecriv.nomEcrivain }}</td>
              <td>
                <a class="btn btn-success" (click)="updateEcriv(ecriv)">Editer</a>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="4" class="text-center text-muted">
                Aucun écrivain trouvé.
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  </div>
</div>
  `,
})
export class ListeEcrivains implements OnInit {
  ecrivains: Ecrivain[] = [];
  updatedEcriv: Ecrivain = { idEcrivain: 0, nomEcrivain: '', prenomEcrivain: '' };
  ajout: boolean = true;

  constructor(
    private livreService: LivreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerEcrivains();
  }

  chargerEcrivains(): void {
    this.livreService.listeEcrivains().subscribe({
      next: (cats) => {
        console.log(cats);
        this.ecrivains = cats._embedded.ecrivains;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des écrivains :', err);
      },
    });
  }

  updateEcriv(ecriv: Ecrivain): void {
    this.updatedEcriv = ecriv;
    this.ajout = false;
  }

  ecrivainUpdated(ecriv: Ecrivain): void {
    console.log('Ecrivain updated event', ecriv);
    if (this.ajout) {
      this.livreService.ajouterEcrivain(ecriv).subscribe({
        next: () => {
          this.chargerEcrivains();
          this.resetForm();
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de l'écrivain :", err);
        },
      });
    } else {
      this.livreService.updateEcrivain(ecriv).subscribe({
        next: () => {
          this.chargerEcrivains();
          this.resetForm();
        },
        error: (err) => {
          // Si le backend Spring Data REST accepte POST pour la mise à jour
          this.livreService.ajouterEcrivain(ecriv).subscribe({
            next: () => {
              this.chargerEcrivains();
              this.resetForm();
            },
            error: (e) => console.error('Erreur mise à jour écrivain :', e),
          });
        },
      });
    }
  }

  resetForm(): void {
    this.updatedEcriv = { idEcrivain: 0, nomEcrivain: '', prenomEcrivain: '' };
    this.ajout = true;
  }
}

export { ListeEcrivains as ListeEcrivainsComponent };

