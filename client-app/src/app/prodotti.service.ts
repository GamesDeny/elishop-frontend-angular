import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Prodotto } from 'src/models/prodotto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdottiService {

  urlSuffix = '/prodotto';

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get<Prodotto[]>(`${environment.apiUrl}${this.urlSuffix}/all`);
  }
}
