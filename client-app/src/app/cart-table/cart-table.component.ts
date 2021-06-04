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
    /*if(this.righeCarrello != undefined){
      if(this.righeCarrello.length = 0){
        this.showLoading = true;
      }
    }*/
    
  }

  calcolaTotale():number{
    return this.CarrelloService.calcolaTotale();
  }

  ngOnInit(): void {
    console.log("init carrello");
    
   // this.getCarrello();
    
  }
}
