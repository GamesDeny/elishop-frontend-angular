import { Injectable } from '@angular/core';
import { exists } from 'fs';
import { Prodotto } from 'src/models/prodotto.model';
import { RigaOrdine } from 'src/models/riga-ordine.model';

@Injectable({
  providedIn: 'root',
})
export class CarrelloService {
  carrello: RigaOrdine[] = [];
  prezzoTotale: number;

  constructor() {}

  addProdotto(prodotto: Prodotto, quantita: number) {
    var esiste: boolean = false;

    this.carrello.forEach((prod) => {
      if (prod.prodotto_id == prodotto.id) {
        esiste = true;
        let newQuantita = prod.quantitaProdotto + quantita;
        if (newQuantita <= prodotto.maxOrd) {
          prod.quantitaProdotto = newQuantita;
          if (prodotto.sconto > 0) {
            prod.prezzoTotale = prodotto.prezzoScontato * quantita;
          } else {
            prod.prezzoTotale = prodotto.prezzo * quantita;
          }
        }
      }
    });

    if (!esiste) {
      let rigaOrdine: RigaOrdine = new RigaOrdine();
      rigaOrdine.prodotto_id = prodotto.id;
      rigaOrdine.quantitaProdotto = quantita;
      rigaOrdine.scontoApplicato = prodotto.sconto;

      if (prodotto.sconto > 0) {
        rigaOrdine.prezzoTotale = prodotto.prezzoScontato * quantita;
      } else {
        rigaOrdine.prezzoTotale = prodotto.prezzo * quantita;
      }
      this.carrello.push(rigaOrdine);
    }

    this.calcolaTotale();
  }

  calcolaTotale():number {
    this.prezzoTotale = 0;
    this.carrello.forEach((prod) => {
      this.prezzoTotale += prod.prezzoTotale;
    });
    return this.prezzoTotale;
  }

  removeProdotto(prodotto: Prodotto) {
    let idProdotto = prodotto.id;

    for (let i = 0; i < this.carrello.length; i++) {
      if (idProdotto == this.carrello[i].id) {
        this.carrello.splice(i, 1);
        this.prezzoTotale -= prodotto.prezzo;
      }
    }
  }

  removeAll() {
    this.carrello.splice(0, this.carrello.length);
  }
}
