import { Injectable } from '@angular/core';
import { Prodotto } from 'src/models/prodotto.model';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  carrello: Prodotto[] = [];
  prezzoTotale: number = 0;

  constructor() { }


  addProdotto(prodotto: Prodotto){
    this.carrello.push(prodotto);
    this.prezzoTotale += prodotto.prezzo;

  }

  removeProdotto(prodotto: Prodotto){

    for(let i=0; i<this.carrello.length; i++){
      if(prodotto.id == this.carrello[i].id){
        this.carrello.splice(i, 1);
        this.prezzoTotale -= prodotto.prezzo;
      }
    }
  }

  removeAll(){
    this.carrello.splice(0, this.carrello.length);
  }

}
