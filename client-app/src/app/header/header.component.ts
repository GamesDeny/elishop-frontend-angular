import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() utente: Utente;

  opzioni: MenuItem[];
  showDialog: boolean;
  carrello: RigaOrdine[];
  righeCarrello: RigaCarrello[];
  prezzoTotale: number;

  constructor(
    public CarrelloService: CarrelloService,
    private ProdottiService: ProdottiService,
    private CategoriaService: CategoriaService,
    private router: Router,
    private UtenteService: UtenteService
  ) {}

  isLogged(): boolean {
    if (this.utente != null && this.utente != undefined) {
      return true;
    } else {
      return false;
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
        command: () =>{ 
          this.UtenteService.logout();
          window.location.reload();
        },
      },
    ];
  }

  showOpzioni(panel:OverlayPanel, event:MouseEvent){
    panel.toggle(event);
  }

  ngOnInit(): void {
    this.initOpzioni();
  }

  getCarrello() {
    console.log("ottengo il carrello");
    
    this.carrello = this.CarrelloService.carrello;
    this.prezzoTotale = this.CarrelloService.prezzoTotale;
    this.righeCarrello = [];
    this.populateRows();
  }

  populateRows() {

    //this.showLoading = true;

    this.carrello.forEach((rigaOrdine)=>{
      let prodottoAssociato: Prodotto = new Prodotto;

      console.log("creo righe carrello");
      this.ProdottiService.getById(rigaOrdine.prodotto_id).subscribe(
        (response) => {
          prodottoAssociato = response;
          this.CategoriaService.getById(
            prodottoAssociato.categoria_id
          ).subscribe((response) => {
            prodottoAssociato.categoria = response;

            let rigaCarrello: RigaCarrello = new RigaCarrello;
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

  navToCheckout(){
    if(this.CarrelloService.carrello.length>=1){
      this.showDialog = false;
      this.router.navigate([Path.Checkout]);
    }
   
  }
}
