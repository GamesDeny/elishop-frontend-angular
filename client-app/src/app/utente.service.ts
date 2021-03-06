import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Feedback } from 'src/models/feedback.model';
import { Ordine } from 'src/models/ordine.model';
import { Proposta } from 'src/models/proposta.model';
import { Utente } from 'src/models/utente.model';

@Injectable({
  providedIn: 'root',
})
export class UtenteService {
  constructor(private http: HttpClient) {}

  getLoggedUser(): Utente {
    let utente: Utente = JSON.parse(sessionStorage.getItem('utente'));
    return utente;
  }

  checkIfAdmin(): boolean {
    let utente = this.getLoggedUser();
    return utente.isAdmin;
  }

  getAll() {
    return this.http.get<Utente[]>(`${environment.apiUrl}/utente/all`);
  }

  getById(id) {
    return this.http.get<Utente>(`${environment.apiUrl}/utente/id/${id}`);
  }

  login(utente) {
    return this.http.post<Utente>(`${environment.apiUrl}/utente/login`, utente);
  }

  register(utente) {
    return this.http.post(`${environment.apiUrl}/utente/add`, utente);
  }

  logout() {
    sessionStorage.removeItem('utente');
  }

  getOrdini(utenteId) {
    return this.http.get<Ordine[]>(
      `${environment.apiUrl}/ordine/all/utente/${utenteId}`
    );
  }

  getFeedbacks(utenteId) {
    return this.http.get<Feedback[]>(
      `${environment.apiUrl}/feedback/all/utente/${utenteId}`
    );
  }

  getProposte(utenteId) {
    return this.http.get<Proposta[]>(
      `${environment.apiUrl}/proposta/all/utente/${utenteId}`
    );
  }

  update(id, utente) {
    return this.http.patch(`${environment.apiUrl}/utente/update/${id}`, utente);
  }
}
