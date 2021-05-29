export class Prodotto{
    id: number;
    nome: string;
    descrizione: string;
    nomeCategoria: string;
    prezzo: number;
    prezzoScontato?:number;
    minOrd: number;
    maxOrd: number;
    sconto: number;
    quantita: number;
    image: string;
}