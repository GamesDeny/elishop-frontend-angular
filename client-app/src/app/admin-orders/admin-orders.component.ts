import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordine } from 'src/models/ordine.model';
import { OrdineService } from '../ordine.service';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  ordini: Ordine[];
  showLoading: boolean;

  constructor(
    private OrdineService: OrdineService,
    private UtenteService: UtenteService
  ) {}

  getOrdini() {
    this.showLoading = true;
    this.OrdineService.getAll().subscribe((response) => {
      this.ordini = response;
      var index = 0;
      Observable.from(this.ordini)
        .concatMap((ordine) => this.OrdineService.getProdotti(ordine.id))
        .subscribe(
          (response) => {
            this.ordini[index].prodotti = response;
            index++;
          },
          (err) => {
            console.log(err);
          },
          () => {
            this.showLoading = false;
            /* index = 0;
            Observable.from(this.ordini)
              .concatMap((ordine) => this.UtenteService.getById(ordine.userId))
              .subscribe(
                (response) => {
                  this.ordini[index].utente = response;
                  index++;
                },
                (err) => {
                  console.log(err);
                },
                () => {
                  this.showLoading = false;
                  console.log(this.ordini);
                }
              );*/
          }
        );
    });
  }

  ngOnInit(): void {
    this.getOrdini();
  }

  evadi(ordine: Ordine) {
    this.showLoading = true;
    ordine.evaso = true;
    this.OrdineService.evadi(ordine.id, ordine).subscribe((response) => {
      this.getOrdini();
    });
  }
}
