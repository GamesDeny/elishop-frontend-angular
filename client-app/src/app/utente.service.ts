import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Utente } from 'src/models/utente.model';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  constructor(private http: HttpClient) { }

  getLoggedUser(): Utente{
    let utente: Utente = JSON.parse(sessionStorage.getItem("utente"));
    return utente;
  }

  login(utente){
    return this.http.post(`${environment.apiUrl}/utente/login`, utente);
  }

}
