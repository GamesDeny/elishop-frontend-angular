import { Component, Input, OnInit } from '@angular/core';
import { Utente } from 'src/models/utente.model';
import { CarrelloService } from '../carrello.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() utente: Utente;

  constructor(public CarrelloService: CarrelloService) {}

  isLogged(): boolean {
    if (this.utente != null && this.utente != undefined) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {}
}
