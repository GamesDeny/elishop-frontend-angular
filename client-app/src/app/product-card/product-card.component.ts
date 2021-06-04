import { Component, Input, OnInit } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Prodotto } from 'src/models/prodotto.model';
import { CarrelloService } from '../carrello.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() prodotto: Prodotto;

  disponibile: boolean;
  limitato: boolean;
  nonDisponibile: boolean;
  scontato: boolean;
  quantitaSelezionata: number;
  showDialog: boolean;

  constructor(private CarrelloService: CarrelloService) {}

  chekQuantita() {
    this.disponibile = false;
    this.limitato = false;
    this.nonDisponibile = false;

    var quantita = this.prodotto.quantita;

    if (quantita >= 1 && quantita <= 3) {
      this.limitato = true;
    } else if (quantita <= 0) {
      this.nonDisponibile = true;
    } else {
      this.disponibile = true;
    }
  }

  checkSconto() {
    if (this.prodotto.sconto > 0) {
      this.scontato = true;

      let sconto = (this.prodotto.prezzo / 100) * this.prodotto.sconto;

      this.prodotto.prezzoScontato = this.prodotto.prezzo - sconto;
    }
  }

  addToCart() {
    if (this.quantitaSelezionata > 0) {
      this.CarrelloService.addProdotto(this.prodotto, this.quantitaSelezionata);
      console.log(this.CarrelloService.carrello);
      this.showDialog = false;
    }
  }

  showPanel(panel: OverlayPanel, event: MouseEvent) {
    panel.toggle(event);
  }

  ngOnInit(): void {
    this.chekQuantita();
    this.checkSconto();
  }
}
