import { Prodotto } from './prodotto.model';
import { RigaOrdine } from './riga-ordine.model';
import { Utente } from './utente.model';

export class Ordine {
  id: number;
  userId: number;
  utente_id: number;
  evaso: boolean;
  righe: RigaOrdine[];
  prodotti: Prodotto[];
  utente: Utente;
}
