import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/models/utente.model';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-admin-tabs',
  templateUrl: './admin-tabs.component.html',
  styleUrls: ['./admin-tabs.component.css'],
})
export class AdminTabsComponent implements OnInit {
  utente: Utente;

  constructor(private UtenteService: UtenteService) {}

  getUtente() {
    this.utente = this.UtenteService.getLoggedUser();
  }

  ngOnInit(): void {
    this.getUtente();
  }
}
