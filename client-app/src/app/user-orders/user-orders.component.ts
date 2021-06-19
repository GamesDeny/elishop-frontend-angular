import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { Ordine } from 'src/models/ordine.model';
import { Utente } from 'src/models/utente.model';
import { OrdineService } from '../ordine.service';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  @Input() utente: Utente;

  ordini: Ordine[];
  showLoading: boolean;

  constructor(
    private UtenteService: UtenteService,
    private OrdineService: OrdineService
  ) {}

  getOrdini() {
    this.showLoading = true;
    this.UtenteService.getOrdini(this.utente.id).subscribe((response) => {
      console.log(response);
      this.ordini = response;
      var orderIndex = 0;
      Observable.from(this.ordini)
        .concatMap((ordine) => this.OrdineService.getProdotti(ordine.id))
        .subscribe(
          (response) => {            
            this.ordini[orderIndex].prodotti = response;
            orderIndex++;
          },
          (error) => {
            console.log(error);
            
          },
          () => {
            console.log(this.ordini);
            this.showLoading = false;           
          }
        );
    });
  }

  ngOnInit(): void {
    this.getOrdini();
  }
}
