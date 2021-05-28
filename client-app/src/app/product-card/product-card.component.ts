import { Component, Input, OnInit } from '@angular/core';
import { Prodotto } from 'src/models/prodotto.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() prodotto:Prodotto

  disponibile: boolean;
  limitato: boolean;
  nonDisponibile: boolean;



  constructor() { }

  chekQuantita(){

    this.disponibile = false;
    this.limitato = false;
    this.nonDisponibile = false;

    var quantita = this.prodotto.quantita;

    if(quantita >= 1 && quantita <=3 ){
      this.limitato = true;  

    }else if(quantita <= 0){
      this.nonDisponibile = true;

    }else{
      this.disponibile = true;
    }
  }

  ngOnInit(): void {
    this.chekQuantita();
  }

}
