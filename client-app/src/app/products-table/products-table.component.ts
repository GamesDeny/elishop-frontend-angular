import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs-compat';
import { Prodotto } from 'src/models/prodotto.model';
import { CategoriaService } from '../categoria.service';
import { OrdineService } from '../ordine.service';
import { ProdottiService } from '../prodotti.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit {
  prodotti: Prodotto[] = [];
  showLoading: boolean;

  constructor(
    private ProdottiService: ProdottiService,
    private CategoriaService: CategoriaService,
    private OrdineService: OrdineService,
    private messageService: MessageService
  ) {}

  getProdotti() {
    this.showLoading = true;
    this.prodotti = [];
    this.ProdottiService.getAll().subscribe(
      (response) => {
        response.forEach((prod) => {
          if (!prod.isDeleted) {
            this.prodotti.push(prod);
          }
        });
        console.log(this.prodotti);
        this.getCategorie();
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.showLoading = false;
      }
    );
  }

  getCategorie() {
    let i = 0;
    Observable.from(this.prodotti)
      .concatMap((prodotto) =>
        this.CategoriaService.getById(prodotto.categoria_id)
      )
      .subscribe((response) => {
        this.prodotti[i].categoria = response;
        i++;
      });
  }

  showMessage() {
    if (this.OrdineService.orderSuccess == true) {
      console.log('add message');
      this.messageService.add({
        severity: 'success',
        summary: 'Successo',
        detail: 'Ordine effettuato con successo',
      });
      this.OrdineService.orderSuccess = false;
    }
  }

  ngOnInit(): void {
    this.showMessage();
    this.getProdotti();
  }
}
