import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/models/utente.model';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  utenti: Utente[];
  showLoading: boolean;
  modifica: boolean;
  utenteSelezionato: Utente;

  constructor(private UtenteService: UtenteService) {}

  getUtenti() {
    this.showLoading = true;
    this.UtenteService.getAll().subscribe(
      (response) => {
        this.utenti = response;
        this.showLoading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.getUtenti();
  }

  modificaUtente(utente: Utente) {
    this.utenteSelezionato = utente;
    this.modifica = true;
  }

  salvaModifiche() {
    this.modifica = false;
    this.showLoading = true;
    delete this.utenteSelezionato.mail;
    delete this.utenteSelezionato.username;
    delete this.utenteSelezionato.siglaResidenza;
    this.UtenteService.update(
      this.utenteSelezionato.id,
      this.utenteSelezionato
    ).subscribe((response) => {
      this.getUtenti();
    });
  }
}
