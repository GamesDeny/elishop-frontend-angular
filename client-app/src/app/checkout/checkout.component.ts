import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ordine } from 'src/models/ordine.model';
import { Pagamento } from 'src/models/pagamento.model';
import { Path } from 'src/models/path.enum';
import { RigaOrdine } from 'src/models/riga-ordine.model';
import { TipoPagamento } from 'src/models/tipo-pagamento.model';
import { Utente } from 'src/models/utente.model';
import { CarrelloService } from '../carrello.service';
import { OrdineService } from '../ordine.service';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  metodiPagamento: TipoPagamento[];
  metodoSelezionato: TipoPagamento = null;
  pagamento: Pagamento;
  idRighe: number[];
  showLoading: boolean;

  constructor(
    private OrdineService: OrdineService,
    private CarrelloService: CarrelloService,
    private UtenteService: UtenteService,
    private router: Router
  ) {}

  getMetodiPagamento() {
    this.showLoading = true;

    this.OrdineService.getTipiPagamento().subscribe((response) => {
      console.log(response);

      this.metodiPagamento = response;
      this.showLoading = false;
    });
  }

  effettuaOrdine() {
    this.showLoading = true;

    var carrello: RigaOrdine[] = this.CarrelloService.carrello;
    var prezzoTotale = this.CarrelloService.prezzoTotale;
    var utente: Utente = this.UtenteService.getLoggedUser();

    let newPagamento: Pagamento = new Pagamento();
    newPagamento.contanti = prezzoTotale;
    newPagamento.descrizione = this.metodoSelezionato.nome;
    newPagamento.tipoMetodo_id = this.metodoSelezionato.id;
    newPagamento.utente_id = utente.id;

    this.OrdineService.addNewPagamento(newPagamento).subscribe((response) => {
      this.pagamento = response;

     /* carrello.forEach((riga) => {
        this.OrdineService.addNewRiga(riga).subscribe((response) => {
          console.log(response);
          this.idRighe.push(response.id);
        });
      });*/

      

      let newOrdine: Ordine = new Ordine();
      newOrdine.righe = this.idRighe;

      console.log(this.idRighe);

      this.OrdineService.addNewOrdine(
        newOrdine,
        utente.id,
        this.pagamento.id
      ).subscribe((response) => {
        console.log(response);
        this.router.navigate([Path.Mainpage]);
      });
    });
  }

  initArrays() {
    this.metodiPagamento = [];
    this.idRighe = [];
  }

  ngOnInit(): void {
    this.initArrays();
    this.getMetodiPagamento();
  }
}
