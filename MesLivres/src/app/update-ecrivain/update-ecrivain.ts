import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ecrivain } from '../model/ecrivain.model';

@Component({
  selector: 'app-update-ecrivain',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styles: ``,
  template: `
<form>
  <div [hidden]="ajout" class="mb-3">
    <label class="form-label">ID Écrivain</label>
    <input
      type="text"
      [(ngModel)]="ecrivain.idEcrivain"
      name="idEcrivain"
      class="form-control w-25"
      readonly
    />
  </div>

  <div class="mb-3">
    <label class="form-label">Prénom Écrivain</label>
    <input
      type="text"
      [(ngModel)]="ecrivain.prenomEcrivain"
      name="prenomEcrivain"
      class="form-control"
      placeholder="Entrez le prénom de l'écrivain..."
    />
  </div>

  <div class="mb-3">
    <label class="form-label">Nom Écrivain</label>
    <input
      type="text"
      [(ngModel)]="ecrivain.nomEcrivain"
      name="nomEcrivain"
      class="form-control"
      placeholder="Entrez le nom de l'écrivain..."
    />
  </div>

  <div class="mt-2">
    <button
      type="button"
      [disabled]="!ecrivain.nomEcrivain"
      class="btn btn-success"
      (click)="saveEcrivain()"
    >
      {{ ajout ? 'Ajouter' : 'Modifier' }}
    </button>
  </div>
</form>
  `,
})
export class UpdateEcrivain implements OnInit {
  @Input()
  ecrivain!: Ecrivain;

  @Input()
  ajout!: boolean;

  @Output()
  ecrivainUpdated = new EventEmitter<Ecrivain>();

  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateEcrivain ', this.ecrivain);
  }

  saveEcrivain(): void {
    this.ecrivainUpdated.emit(this.ecrivain);
  }
}

export { UpdateEcrivain as UpdateEcrivainComponent };

