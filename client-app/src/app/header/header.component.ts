import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Path } from 'src/models/path.enum';
import { RigaCarrello } from 'src/models/riga-carrello.model';
import { RigaOrdine } from 'src/models/riga-ordine.model';
import { Utente } from 'src/models/utente.model';
import { CarrelloService } from '../carrello.service';
import { UtenteService } from '../utente.service';
import { CategoriaService } from '../categoria.service';
import { ProdottiService } from '../prodotti.service';
import { Prodotto } from 'src/models/prodotto.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck {
  @Input() utente: Utente;

  opzioni: MenuItem[];
  showDialog: boolean;
  carrello: RigaOrdine[];
  righeCarrello: RigaCarrello[];
  prezzoTotale: number;
  logged: boolean;
  home: boolean = true;

  constructor(
    public CarrelloService: CarrelloService,
    private ProdottiService: ProdottiService,
    private CategoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private UtenteService: UtenteService
  ) {}
  ngDoCheck(): void {
    this.checkRoute();
  }

  isLogged() {
    if (
      this.UtenteService.getLoggedUser() != null &&
      this.UtenteService.getLoggedUser() != undefined
    ) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

  navToLogin() {
    this.router.navigate([Path.Login]);
  }

  initOpzioni() {
    this.opzioni = [
      {
        label: "<span class='logout-label'>Esci</span>",
        icon: 'pi pi-fw pi-sign-out logout-label',
        escape: false,
        command: () => {
          this.UtenteService.logout();
          this.isLogged();
          this.router.navigate([Path.Mainpage]);
          //window.location.reload();
        },
      },
      {
        label: 'I tuoi dettagli',
        icon: 'pi pi-fw pi-info-circle',
        command: () => {
          this.router.navigate([Path.UserDetails, this.utente.id]);
        },
      },
    ];
  }

  showOpzioni(panel, event) {
    panel.toggle(event);
  }

  ngOnInit(): void {
    this.isLogged();
    this.initOpzioni();
    //this.navigationEnd();
  }

  getCarrello() {
    console.log('ottengo il carrello');

    this.carrello = this.CarrelloService.carrello;
    this.prezzoTotale = this.CarrelloService.prezzoTotale;
    this.righeCarrello = [];
    this.populateRows();
  }

  populateRows() {
    //this.showLoading = true;

    this.carrello.forEach((rigaOrdine) => {
      let prodottoAssociato: Prodotto = new Prodotto();

      console.log('creo righe carrello');
      this.ProdottiService.getById(rigaOrdine.prodotto_id).subscribe(
        (response) => {
          prodottoAssociato = response;
          this.CategoriaService.getById(
            prodottoAssociato.categoria_id
          ).subscribe((response) => {
            prodottoAssociato.categoria = response;

            let rigaCarrello: RigaCarrello = new RigaCarrello();
            rigaCarrello.idProdotto = prodottoAssociato.id;
            rigaCarrello.nome = prodottoAssociato.nome;
            rigaCarrello.immagine = prodottoAssociato.image;
            rigaCarrello.categoria = prodottoAssociato.categoria.nome;
            rigaCarrello.prezzo = rigaOrdine.prezzoTotale;
            rigaCarrello.quantita = rigaOrdine.quantitaProdotto;
            rigaCarrello.sconto = rigaOrdine.scontoApplicato;

            this.righeCarrello.push(rigaCarrello);
          });
        }
      );
    });

    this.showDialog = true;
  }

  navToCheckout() {
    if (this.CarrelloService.carrello.length >= 1) {
      this.showDialog = false;
      this.router.navigate([Path.Checkout]);
    }
  }

  navToHome() {
    this.router.navigate([Path.Mainpage]);
  }

  navigationEnd() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.checkRoute());
  }

  checkRoute() {
    var url: string = this.router.url;
    //console.log(this.router.url);

    if (url == '/' || url == '/admin-tabs') {
      this.home = true;
    } else {
      this.home = false;
    }
  }

  isAdmin(): boolean {
    if (this.utente != null) {
      return this.UtenteService.checkIfAdmin();
    } else {
      return false;
    }
  }
}
