import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/models/categoria.model';
import { Path } from 'src/models/path.enum';
import { Proposta } from 'src/models/proposta.model';
import { CategoriaService } from '../categoria.service';
import { ProposteService } from '../proposte.service';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-add-proposta',
  templateUrl: './add-proposta.component.html',
  styleUrls: ['./add-proposta.component.css'],
})
export class AddPropostaComponent implements OnInit {
  formProposta;
  categorie: Categoria[];
  showLoading: boolean;
  showDialog: boolean;
  success: boolean;
  error: boolean;
  adding: boolean;
  nomeCategoria: string;
  successAdd: boolean;
  errorAdd: boolean;

  constructor(
    private ProposteService: ProposteService,
    private UtenteService: UtenteService,
    private CategoriaService: CategoriaService,
    private router: Router
  ) {}

  initForm() {
    this.formProposta = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descrizione: new FormControl('', [Validators.required]),
      prezzoProposto: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      quantita: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  checkUtente() {
    let utente = this.UtenteService.getLoggedUser();
    if (utente != null) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.success = false;
    this.error = false;
    this.showLoading = true;
    let utente = this.UtenteService.getLoggedUser();
    let newProposta = new Proposta();
    newProposta.nome = this.formProposta.get('nome').value;
    newProposta.descrizione = this.formProposta.get('descrizione').value;
    newProposta.prezzoProposto = this.formProposta.get('prezzoProposto').value;
    newProposta.quantita = this.formProposta.get('quantita').value;
    newProposta.image = this.formProposta.get('image').value;
    newProposta.utente_id = utente.id;
    this.ProposteService.addNew(newProposta).subscribe(
      (response) => {
        this.success = true;
        this.showLoading = false;
      },
      (error) => {
        this.error = true;
        this.showLoading = false;
      }
    );
  }

  navToLogin() {
    this.router.navigate([Path.Login]);
  }
}
