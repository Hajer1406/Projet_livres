import { Ecrivain } from './ecrivain.model';

export class Livre {
  idLivre?: number;
  titreLivre?: string;
  nombrePages?: number;
  datePublication?: Date;
  prix?: number;
  ecrivain?: Ecrivain;
}
