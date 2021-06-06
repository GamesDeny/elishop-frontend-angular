export class Pagamento{
    id: number;
    descrizione: string;
    paypalMail ?: string;
    contanti: number;
    isDefault ?: boolean;
    utente_id ?: number;
    tipoMetodo_id ?: number;
    ordine_id ?: number;
}