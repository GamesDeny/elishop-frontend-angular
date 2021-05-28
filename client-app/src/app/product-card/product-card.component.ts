import { Component, Input, OnInit } from '@angular/core';
import { Prodotto } from 'src/models/prodotto.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() prodotto:Prodotto

  disponibilita: string;
  container = document.getElementById("disponibilita-container");


  constructor() { }

  chekQuantita(){
    var quantita = this.prodotto.quantita;

    if(quantita >= 1 && quantita <=3 ){
      this.disponibilita = "Disponibilità imitata";
      this.container.style.backgroundColor = "orange";  

    }else if(quantita <= 0){
      this.disponibilita = "Non disponibile";
      this.container.style.backgroundColor = "red";

    }else{
      this.disponibilita = "Disponibile";
      this.container.style.backgroundColor = "green";
    }
  }

  ngOnInit(): void {
    this.chekQuantita();
  }

}
