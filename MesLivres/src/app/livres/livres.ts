import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Livre } from '../model/livre.model';
import { LivreService } from '../services/livre.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-livres',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './livres.html',
  styleUrl: './livres.css',
})
export class Livres implements OnInit {
  livres: Livre[] = [];

  constructor(
    private livreService: LivreService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerLivres();
  }

  chargerLivres(): void {
    this.livreService.listeLivre().subscribe({
      next: (livres) => {
        console.log(livres);
        this.livres = livres;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des livres (vérifiez si le backend Spring Boot est lancé) :', err);
      },
    });
  }

  supprimerLivre(l: Livre): void {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.livreService.supprimerLivre(l.idLivre!).subscribe({
        next: () => {
          console.log('livre supprimé');
          this.chargerLivres();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        },
      });
    }
  }
}

export { Livres as LivresComponent };
