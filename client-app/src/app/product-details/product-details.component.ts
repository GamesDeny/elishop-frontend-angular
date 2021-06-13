import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Prodotto } from 'src/models/prodotto.model';
import { CarrelloService } from '../carrello.service';
import { CategoriaService } from '../categoria.service';
import { ProdottiService } from '../prodotti.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  prodotto: Prodotto;
  quantitaSelezionata: number;
  showLoading: boolean;
  showDialog: boolean;
  scontato: boolean;
  esaurito: boolean;

  constructor(
    private route: ActivatedRoute,
    private ProdottiService: ProdottiService,
    private CategoriaService: CategoriaService,
    private CarrelloService: CarrelloService
  ) {}

  getProdotto() {
    this.showLoading = true;
    let idProdotto: number;
    this.route.params.subscribe((params) => {
      idProdotto = params.id;
      this.ProdottiService.getById(idProdotto).subscribe((response) => {
        this.prodotto = response;
        this.CategoriaService.getById(this.prodotto.categoria_id).subscribe(
          (response) => {
            this.prodotto.categoria = response;
            this.checkSconto();
            this.checkQuantita();
            this.showLoading = false;
          }
        );
      });
    });
  }

  ngOnInit(): void {
    this.getProdotto();
  }

  checkSconto() {
    if (this.prodotto.sconto > 0) {
      this.scontato = true;

      let sconto = (this.prodotto.prezzo / 100) * this.prodotto.sconto;

      this.prodotto.prezzoScontato = this.prodotto.prezzo - sconto;
    }
  }

  checkQuantita() {
    if (this.prodotto.quantita == 0) {
      this.esaurito = true;
    } else {
      this.esaurito = false;
    }
  }

  addToCart() {
    if (this.quantitaSelezionata > 0) {
      this.CarrelloService.addProdotto(this.prodotto, this.quantitaSelezionata);
      console.log(this.CarrelloService.carrello);
      this.showDialog = false;
    }
  }
}
