import { Injectable } from '@angular/core';
import { Utente } from 'src/models/utente.model';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  constructor() { }

  getLoggedUser(): Utente{
    let utente: Utente = JSON.parse(sessionStorage.getItem("utente"));
    return utente;
  }

}
