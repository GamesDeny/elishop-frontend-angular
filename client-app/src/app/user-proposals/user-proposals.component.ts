import { Component, Input, OnInit } from '@angular/core';
import { Proposta } from 'src/models/proposta.model';
import { Utente } from 'src/models/utente.model';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-user-proposals',
  templateUrl: './user-proposals.component.html',
  styleUrls: ['./user-proposals.component.css'],
})
export class UserProposalsComponent implements OnInit {
  @Input() utente: Utente;

  proposte: Proposta[];
  selectedProposta: Proposta;
  showLoading: boolean;
  showDialog: boolean;
  rifiuto: boolean;

  constructor(private UtenteService: UtenteService) {}

  getProposte() {
    this.showLoading = true;
    this.UtenteService.getProposte(this.utente.id).subscribe((response) => {
      this.proposte = response;
      this.showLoading = false;
    });
  }

  ngOnInit(): void {
    this.getProposte();
  }

  showProposta(proposta) {
    this.selectedProposta = proposta;
    this.showDialog = true;
  }

  showRifiuto(proposta) {
    this.selectedProposta = proposta;
    this.rifiuto = true;
  }
}
