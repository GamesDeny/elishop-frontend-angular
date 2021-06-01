import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Path } from 'src/models/path.enum';
import { Utente } from 'src/models/utente.model';
import { CarrelloService } from '../carrello.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() utente: Utente;

  constructor(public CarrelloService: CarrelloService, private router: Router) {}

  isLogged(): boolean {
    if (this.utente != null && this.utente != undefined) {
      return true;
    } else {
      return false;
    }
  }

  navToLogin(){
    this.router.navigate([Path.Login]);
  }

  ngOnInit(): void {}
}
