import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Proposta } from 'src/models/proposta.model';

@Injectable({
  providedIn: 'root',
})
export class ProposteService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Proposta[]>(`${environment.apiUrl}/proposta/all`);
  }

  getNotAccepted() {
    return this.http.get<Proposta[]>(
      `${environment.apiUrl}/proposta/accettati`
    );
  }

  addNew(proposta: Proposta) {
    return this.http.post(`${environment.apiUrl}/proposta/add`, proposta);
  }

  update(id, proposta) {
    return this.http.patch(
      `${environment.apiUrl}/proposta/update/${id}`,
      proposta
    );
  }
}
