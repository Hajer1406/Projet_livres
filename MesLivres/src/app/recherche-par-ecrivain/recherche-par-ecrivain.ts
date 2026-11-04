import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Livre } from '../model/livre.model';
import { Ecrivain } from '../model/ecrivain.model';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-recherche-par-ecrivain',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styles: ``,
  template: `
<div class="container mt-4">
  <!-- Sélecteur d'écrivain -->
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h5 class="m-0 font-weight-bold text-primary">Recherche par Écrivain</h5>
    </div>
    <div class="card-body">
      <div class="col-sm-5 col-md-5 mb-3">
        <label class="form-label">Écrivain</label>
        <select class="form-select form-select-lg"
                id="idEcrivain"
                name="idEcrivain"
                [(ngModel)]="idEcrivainSelectionne"
                (change)="onChange()">
          <option value="" disabled selected>-- Choisir un écrivain --</option>
          @for (ecriv of ecrivains; track ecriv.idEcrivain) {
            <option [value]="ecriv.idEcrivain">
              {{ ecriv.prenomEcrivain }} {{ ecriv.nomEcrivain }}
            </option>
          }
        </select>
      </div>
    </div>
  </div>

  <!-- Tableau des livres filtrés -->
  <div class="card shadow mb-4">
    <div class="card-body">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Nombre de Pages</th>
            <th>Prix</th>
            <th>Date de Publication</th>
            <th>Écrivain</th>
          </tr>
        </thead>
        <tbody>
          @for (livre of livres; track livre.idLivre) {
            <tr>
              <td>{{ livre.idLivre }}</td>
              <td>{{ livre.titreLivre }}</td>
              <td>{{ livre.nombrePages }}</td>
              <td>{{ livre.prix }}</td>
              <td>{{ livre.datePublication | date: 'dd/MM/yyyy' }}</td>
              @if (livre.ecrivain) {
                <td>{{ livre.ecrivain.prenomEcrivain }} {{ livre.ecrivain.nomEcrivain }}</td>
              } @else {
                <td class="text-muted">PAS D'ÉCRIVAIN</td>
              }
            </tr>
          } @empty {
            <tr>
              <td colspan="6" class="text-center text-muted">
                Sélectionnez un écrivain pour afficher ses livres.
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
export class RechercheParEcrivain implements OnInit {
  livres: Livre[] = [];
  ecrivains: Ecrivain[] = [];
  idEcrivainSelectionne!: number;

  constructor(
    private livreService: LivreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.livreService.listeEcrivains().subscribe({
      next: (ecrivs) => {
        this.ecrivains = ecrivs._embedded.ecrivains;
        console.log(ecrivs);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des écrivains :', err);
      },
    });
  }

  onChange(): void {
    this.livreService.rechercherParEcrivain(+this.idEcrivainSelectionne).subscribe({
      next: (livres) => {
        this.livres = livres;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors de la recherche par écrivain :', err);
      },
    });
  }
}

export { RechercheParEcrivain as RechercheParEcrivainComponent };

