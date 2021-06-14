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
      categoria: new FormControl('', [Validators.required]),
      prezzoProposto: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      quantita: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  getCategorie() {
    this.CategoriaService.getAll().subscribe((response) => {
      this.categorie = response;
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
    this.getCategorie();
    this.initForm();
  }

  onSubmit() {
    this.showLoading = true;
    let utente = this.UtenteService.getLoggedUser();
    let newProposta = new Proposta();
    newProposta.nome = this.formProposta.get('nome').value;
    newProposta.descrizione = this.formProposta.get('descrizione').value;
    newProposta.categoria_id = this.formProposta.get('categoria').value.id;
    newProposta.prezzoProposto = this.formProposta.get('prezzoProposto').value;
    newProposta.quantita = this.formProposta.get('quantita').value;
    newProposta.image = this.formProposta.get('image').value;
    this.ProposteService.addNew(utente.id, newProposta).subscribe(
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

  addCategoria() {
    let newCategoria = new Categoria();
    let duplicato: boolean = false;
    newCategoria.nome = this.nomeCategoria;
    this.categorie.forEach((categoria) => {
      if (
        categoria.nome.trim().toLowerCase() ==
        newCategoria.nome.trim().toLowerCase()
      ) {
        duplicato = true;
      }
    });

    if (!duplicato) {
      this.adding = true;
      this.CategoriaService.addNew(newCategoria).subscribe((response) => {
        this.getCategorie();
        this.showDialog = false;
      });
    } else {
      this.errorAdd = true;
    }
  }

  navToLogin() {
    this.router.navigate([Path.Login]);
  }
}
