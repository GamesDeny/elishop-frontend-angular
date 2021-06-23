import { Utente } from './utente.model';

export class Feedback {
  id: number;
  oggetto: string;
  descrizione: string;
  isAccepted: boolean;
  subscriptionDate: string;
  utente_id: number;
  utente: Utente;
}
