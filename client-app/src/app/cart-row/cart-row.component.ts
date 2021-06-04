import { Component, Input, OnInit } from '@angular/core';
import { Prodotto } from 'src/models/prodotto.model';
import { RigaOrdine } from 'src/models/riga-ordine.model';
import { CategoriaService } from '../categoria.service';
import { ProdottiService } from '../prodotti.service';

@Component({
  selector: 'app-cart-row',
  templateUrl: './cart-row.component.html',
  styleUrls: ['./cart-row.component.css']
})
export class CartRowComponent implements OnInit {

  @Input() prodotto:RigaOrdine;

  prodottoAssociato: Prodotto;
  showLoading: boolean;

  constructor(private ProdottiService: ProdottiService, private CategoriaService: CategoriaService) { }

  getProdottoAssociato(){
    this.showLoading = true;
    this.ProdottiService.getById(this.prodotto.prodotto_id).subscribe(
      (response)=>{
        this.prodottoAssociato = response;
        this.CategoriaService.getById(this.prodottoAssociato.categoria_id).subscribe(
          (response)=> {
            this.prodottoAssociato.categoria = response;
            this.showLoading = false;
          }
        )   
      }
    )
  }

  ngOnInit(): void {
    this.getProdottoAssociato();
  }

}
