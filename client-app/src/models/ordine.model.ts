import { Prodotto } from "./prodotto.model";
import { RigaOrdine } from "./riga-ordine.model";

export class Ordine{
    id: number;
    userId: number;
    righe: RigaOrdine[];
    prodotti: Prodotto[];
}