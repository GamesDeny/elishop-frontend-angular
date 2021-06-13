import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Proposta } from 'src/models/proposta.model';

@Injectable({
  providedIn: 'root'
})
export class ProposteService {

  constructor(private http: HttpClient) { }

  addNew(userId: number, proposta: Proposta){
    return this.http.post(`${environment.apiUrl}/proposta/add/${userId}`, proposta);
  }
}
