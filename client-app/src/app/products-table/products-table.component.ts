import { Component, OnInit } from '@angular/core';
import { Prodotto } from 'src/models/prodotto.model';
import { ProdottiService } from '../prodotti.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  prodotti: Prodotto[];
  showLoading: boolean;

  constructor(
    private ProdottiService: ProdottiService
  ) { }

  getProdotti(){
    this.showLoading = true;

    this.ProdottiService.getAll().subscribe(
      (response) => {
        this.prodotti = response;
        console.log(this.prodotti);
        
      },
      (err) => {
        console.log(err);
        
      },
      () => {
        this.showLoading = false;
      }
    )
  }

  ngOnInit(): void {
    this.getProdotti();
  }

}
