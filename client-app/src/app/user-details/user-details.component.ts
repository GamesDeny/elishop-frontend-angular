import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Utente } from 'src/models/utente.model';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  utente: Utente

  constructor(private route: ActivatedRoute, private UtenteService: UtenteService) { }

  getUtente(){
    this.utente = this.UtenteService.getLoggedUser();
  }

  ngOnInit(): void {
    this.getUtente();
  }

}
