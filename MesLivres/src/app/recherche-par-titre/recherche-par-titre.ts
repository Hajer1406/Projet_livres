import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';

@Component({
  selector: 'app-recherche-par-titre',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchFilterPipe],
  styles: ``,
  template: `
<div class="container mt-4">
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h5 class="m-0 font-weight-bold text-primary">Recherche de Livres</h5>
    </div>
    <div class="card-body">

      <!-- Méthode 1 : Recherche via API (bouton) -->
      <form class="row g-3 mb-4">
        <div class="col-sm-7">
          <label class="form-label">Titre du livre</label><!--(via API)-->
          <input
            type="text"
            class="form-control"
            [(ngModel)]="titreProduit"
            name="titreProduit"
            placeholder="Ex: Les Misérables"
          />
        </div>
        <div class="col-sm-auto align-self-end">
          <button type="button" (click)="rechercherLivres()" class="btn btn-primary">
            Rechercher
          </button>
        </div>
      </form>

      <!-- Méthode 2 : Filtrage en direct (keyup côté client) -->
      <form class="mb-3">
        <div class="col-sm-7">
          <label class="form-label">Filtrer en tapant </label><!--(keyup côté client)-->
          <input
            class="form-control"
            #searchTermRef
            (keyup)="onKeyUp(searchTermRef.value)"
            placeholder="Filtrage instantané..."
          />
        </div>
      </form>

      <!-- Méthode 3 : Filtrage via pipe Angular -->
      <form class="mb-4">
        <div class="col-sm-7">
          <label class="form-label">Filtrer via Pipe</label>
          <input
            class="form-control"
            [(ngModel)]="searchTerm"
            name="searchTerm"
            placeholder="Filtrage par pipe..."
          />
        </div>
      </form>

    </div>
  </div>

  <!-- Tableau des résultats (pipe appliqué) -->
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
          @for (livre of livres | searchFilter: searchTerm; track livre.idLivre) {
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
                <h4>Aucun livre trouvé !</h4>
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
export class RechercheParTitre implements OnInit {
  // Méthode 1 : via API
  titreProduit: string = '';

  // Méthode 2 : keyup (filtre côté client sur allLivres)
  allLivres: Livre[] = [];

  // Méthode 3 : pipe
  searchTerm: string = '';

  // Liste affichée dans le tableau (commune aux 3 méthodes)
  livres: Livre[] = [];

  constructor(
    private livreService: LivreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.livreService.listeLivre().subscribe({
      next: (livres) => {
        console.log(livres);
        this.livres = livres;
        this.allLivres = livres;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur chargement livres :', err);
      },
    });
  }

  // ── Méthode 1 : Appel API backend ───────────────────────────
  rechercherLivres(): void {
    if (this.titreProduit) {
      this.livreService.rechercherParTitre(this.titreProduit).subscribe({
        next: (livres) => {
          console.log(livres);
          this.livres = livres;
          this.allLivres = livres;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Erreur recherche par titre :', err);
        },
      });
    } else {
      this.livreService.listeLivre().subscribe({
        next: (livres) => {
          console.log(livres);
          this.livres = livres;
          this.allLivres = livres;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Erreur chargement livres :', err);
        },
      });
    }
  }

  // ── Méthode 2 : Filtrage keyup (côté client) ────────────────
  onKeyUp(filterText: string): void {
    this.livres = this.allLivres.filter((item) =>
      item.titreLivre?.toLowerCase().includes(filterText.toLowerCase())
    );
    this.cdr.markForCheck();
  }

  // searchTerm est utilisé directement par le pipe dans le template (Méthode 3)
}

export { RechercheParTitre as RechercheParTitreComponent };

