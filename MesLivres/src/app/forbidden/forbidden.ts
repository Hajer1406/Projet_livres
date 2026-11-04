import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  template: `
    <div class="container mt-5">
      <div class="alert alert-danger text-center shadow-sm">
        <strong>Vous n’êtes pas autorisé…</strong>
      </div>
    </div>
  `,
})
export class Forbidden {}

export { Forbidden as ForbiddenComponent };

