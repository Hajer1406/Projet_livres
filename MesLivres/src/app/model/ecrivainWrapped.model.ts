import { Ecrivain } from './ecrivain.model';

export class EcrivainWrapper {
  _embedded!: { ecrivains: Ecrivain[] };
}

