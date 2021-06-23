import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/models/categoria.model';
import { Proposta } from 'src/models/proposta.model';
import { CategoriaService } from '../categoria.service';
import { ProposteService } from '../proposte.service';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-admin-proposals',
  templateUrl: './admin-proposals.component.html',
  styleUrls: ['./admin-proposals.component.css'],
})
export class AdminProposalsComponent implements OnInit {
  proposte: Proposta[];
  categorie: Categoria[];
  showLoading: boolean;
  descrizione: boolean;
  selectedProposta: Proposta;
  accettazione: boolean;
  formAccettazione;
  categoriaAggiunta: boolean;
  rifiuto: boolean;
  formRifiuto;

  constructor(
    private ProposteService: ProposteService,
    private CategoriaService: CategoriaService,
    private UtenteService: UtenteService
  ) {}

  getProposte() {
    this.showLoading = true;
    this.ProposteService.getNotAccepted().subscribe((response) => {
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

  getCategorie() {
    this.CategoriaService.getAll().subscribe((response) => {
      this.categorie = response;
    });
  }

  showProposta(proposta) {
    this.selectedProposta = proposta;
    this.descrizione = true;
  }

  accetta(proposta) {
    this.getCategorie();
    this.selectedProposta = proposta;
    this.formAccettazione = new FormGroup({
      image: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      nuovaCategoria: new FormControl(''),
    });
    this.accettazione = true;
  }

  nuovaCategoria() {
    this.categoriaAggiunta = false;
    let newCategoria: Categoria = new Categoria();
    newCategoria.nome = this.formAccettazione.get('nuovaCategoria').value;
    this.CategoriaService.addNew(newCategoria).subscribe((response) => {
      this.categoriaAggiunta = true;
      this.getCategorie();
    });
  }

  confermaAccettazione() {
    this.showLoading = true;
    this.accettazione = false;
    this.selectedProposta.isAccettato = true;
    this.selectedProposta.categoria_id =
      this.formAccettazione.get('categoria').value.id;
    this.selectedProposta.image = this.formAccettazione.get('image').value;
    delete this.selectedProposta.utente;
    this.ProposteService.update(
      this.selectedProposta.id,
      this.selectedProposta
    ).subscribe((response) => {
      this.getProposte();
    });
  }

  rifiuta(proposta) {
    this.selectedProposta = proposta;
    this.formRifiuto = new FormGroup({
      motivoRifiuto: new FormControl('', [Validators.required]),
    });
    this.rifiuto = true;
  }

  confermaRifiuto() {
    this.showLoading = true;
    this.rifiuto = false;
    this.selectedProposta.isAccettato = false;
    this.selectedProposta.motivoRifiuto =
      this.formRifiuto.get('motivoRifiuto').value;
    delete this.selectedProposta.utente;
    this.ProposteService.update(
      this.selectedProposta.id,
      this.selectedProposta
    ).subscribe((response) => {
      this.getProposte();
    });
  }
}
