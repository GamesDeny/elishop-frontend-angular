import { Component, OnInit } from '@angular/core';
import { Prodotto } from 'src/models/prodotto.model';
import { CategoriaService } from '../categoria.service';
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
    private ProdottiService: ProdottiService,
    private CategoriaService: CategoriaService
  ) { }

  getProdotti(){
    this.showLoading = true;

    this.ProdottiService.getAll().subscribe(
      (response) => {
        this.prodotti = response;
        console.log(this.prodotti);
        this.getCategorie();
        
      },
      (err) => {
        console.log(err);
        
      },
      () => {
        this.showLoading = false;
      }
    )
  }

  getCategorie(){
    for(let i=0; i<this.prodotti.length; i++){
      this.CategoriaService.getById(this.prodotti[i].categoria_id).subscribe(
        (response)=> {
          console.log(response);
          this.prodotti[i].categoria = response;
        }
      )
    }
  }


  ngOnInit(): void {
    this.getProdotti();
  }

}
