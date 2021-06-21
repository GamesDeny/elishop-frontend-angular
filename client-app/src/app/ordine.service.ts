import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ordine } from 'src/models/ordine.model';
import { Pagamento } from 'src/models/pagamento.model';
import { Prodotto } from 'src/models/prodotto.model';
import { RigaOrdine } from 'src/models/riga-ordine.model';
import { TipoPagamento } from 'src/models/tipo-pagamento.model';

@Injectable({
  providedIn: 'root',
})
export class OrdineService {
  orderSuccess: boolean;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Ordine[]>(`${environment.apiUrl}/ordine/all`);
  }

  addNewRiga(rigaOrdine) {
    return this.http.post<RigaOrdine>(
      `${environment.apiUrl}/rigaordine/add`,
      rigaOrdine
    );
  }

  getTipiPagamento() {
    return this.http.get<TipoPagamento[]>(
      `${environment.apiUrl}/tipometodo/all`
    );
  }

  addNewPagamento(pagamento) {
    return this.http.post<Pagamento>(
      `${environment.apiUrl}/pagamento/add`,
      pagamento
    );
  }

  addNewOrdine(righeOrdine, idUtente, idPagamento) {
    return this.http.post(
      `${environment.apiUrl}/ordine/add/${idUtente}/${idPagamento}`,
      righeOrdine
    );
  }

  getProdotti(ordineId) {
    return this.http.get<Prodotto[]>(
      `${environment.apiUrl}/prodotto/all/ordine/${ordineId}`
    );
  }

  evadi(id, ordine) {
    return this.http.patch(`${environment.apiUrl}/ordine/update/${id}`, ordine);
  }
}
