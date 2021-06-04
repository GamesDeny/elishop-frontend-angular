import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Path } from 'src/models/path.enum';
import { Utente } from 'src/models/utente.model';
import { CarrelloService } from '../carrello.service';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() utente: Utente;

  opzioni: MenuItem[];

  constructor(
    public CarrelloService: CarrelloService,
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
}
