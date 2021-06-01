import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/models/utente.model';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit {
  utente: Utente;

  constructor(private UtenteService: UtenteService) {}

  checkIfLogged(){
    let utente: Utente = this.UtenteService.getLoggedUser();
    if (utente != null && utente != undefined) {
      this.utente = utente;
    }
  }

  ngOnInit(): void {
    this.checkIfLogged();
  }
}
