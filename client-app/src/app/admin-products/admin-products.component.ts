import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Prodotto } from 'src/models/prodotto.model';
import { CategoriaService } from '../categoria.service';
import { ProdottiService } from '../prodotti.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  showLoading: boolean;
  prodotti: Prodotto[];

  constructor(
    private ProdottiService: ProdottiService,
    private CategoriaService: CategoriaService
  ) {}

  getProdotti() {
    this.showLoading = true;
    this.ProdottiService.getAll().subscribe((response) => {
      this.prodotti = response;
      var index = 0;
      Observable.from(this.prodotti)
        .concatMap((prodotto) =>
          this.CategoriaService.getById(prodotto.categoria_id)
        )
        .subscribe(
          (response) => {
            this.prodotti[index].categoria = response;
            index++;
          },
          (err) => {},
          () => {
            this.showLoading = false;
          }
        );
    });
  }

  ngOnInit(): void {
    this.getProdotti();
  }
}
