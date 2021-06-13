export class Proposta{
    id: number;
    nome: string;
    descrizione: string;
    motivoRifiuto: string;
    image: string;
    prezzoProposto: number;
    quantita: number;
    isAccettato: boolean;
    submissionDate: Date;
    categoria_id: number;
}