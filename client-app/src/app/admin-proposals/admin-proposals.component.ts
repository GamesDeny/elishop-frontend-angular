import { Component, OnInit } from '@angular/core';
import { Proposta } from 'src/models/proposta.model';
import { ProposteService } from '../proposte.service';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-admin-proposals',
  templateUrl: './admin-proposals.component.html',
  styleUrls: ['./admin-proposals.component.css'],
})
export class AdminProposalsComponent implements OnInit {
  proposte: Proposta[];
  showLoading: boolean;
  descrizione: boolean;
  selectedProposta: Proposta;

  constructor(
    private ProposteService: ProposteService,
    private UtenteService: UtenteService
  ) {}

  getProposte() {
    this.showLoading = true;
    this.ProposteService.getAll().subscribe((response) => {
      this.proposte = response;
      this.proposte.forEach((proposta) => {
        this.UtenteService.getById(proposta.utente_id).subscribe((response) => {
          proposta.utente = response;
        });
      });
      console.log(this.proposte);
      this.showLoading = false;
    });
  }

  ngOnInit(): void {
    this.getProposte();
  }

  showProposta(proposta) {
    this.selectedProposta = proposta;
    this.descrizione = true;
  }
}
