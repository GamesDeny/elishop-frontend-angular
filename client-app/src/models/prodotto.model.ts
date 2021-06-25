import { Categoria } from './categoria.model';

export class Prodotto {
  id: number;
  nome: string;
  descrizione: string;
  categoria_id: number;
  categoria?: Categoria;
  prezzo: number;
  prezzoScontato?: number;
  minOrd: number;
  maxOrd: number;
  sconto: number;
  quantita: number;
  image: string;
  utente_id: number;
  isDeleted: boolean;
}
