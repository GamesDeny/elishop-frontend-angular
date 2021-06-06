import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Prodotto } from 'src/models/prodotto.model';
import { RigaCarrello } from 'src/models/riga-carrello.model';
import { RigaOrdine } from 'src/models/riga-ordine.model';
import { CarrelloService } from '../carrello.service';
import { CategoriaService } from '../categoria.service';
import { ProdottiService } from '../prodotti.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css'],
})
export class CartTableComponent implements OnInit, DoCheck {

  @Input() righeCarrello:RigaCarrello[];

  carrello: RigaOrdine[];
  //righeCarrello: RigaCarrello[];
  prezzoTotale: number;
  showLoading: boolean;

  constructor(
    private CarrelloService: CarrelloService,
    private ProdottiService: ProdottiService,
    private CategoriaService: CategoriaService
  ) {}

  ngDoCheck(): void {
    this.calcolaTotale();
    
  }

  calcolaTotale(){
    this.prezzoTotale = this.CarrelloService.calcolaTotale();
  }

  ngOnInit(): void {
    console.log("init carrello");
    
   // this.getCarrello();
    
  }

  rimuoviProdotto(rigaCarrello: RigaCarrello){

    for(let i=0; i<this.righeCarrello.length; i++){

      if(this.righeCarrello[i].idProdotto == rigaCarrello.idProdotto){
        this.righeCarrello.splice(i, 1);
      }
    }

    console.log("rimuovo prodotto dal carrello");
    
    this.CarrelloService.removeProdotto(rigaCarrello);
    console.log("Tabella dopo la rimozione");
    
    console.log(this.righeCarrello);
    this.calcolaTotale();
      
  }

  rimuoviTutti(){
    this.righeCarrello.splice(0, this.righeCarrello.length);
    this.CarrelloService.removeAll();
  }
}
