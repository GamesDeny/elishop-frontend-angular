import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Categoria } from 'src/models/categoria.model';
import { Prodotto } from 'src/models/prodotto.model';
import { CategoriaService } from '../categoria.service';
import { ProdottiService } from '../prodotti.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  providers: [ConfirmationService],
})
export class AdminProductsComponent implements OnInit {
  showLoading: boolean;
  prodotti: Prodotto[];
  categorie: Categoria[];
  dialAggiunta: boolean;
  formAggiunta;

  constructor(
    private ProdottiService: ProdottiService,
    private CategoriaService: CategoriaService,
    private confirmationService: ConfirmationService
  ) {}

  getProdotti() {
    this.showLoading = true;
    this.ProdottiService.getAll().subscribe((response) => {
      this.prodotti = response;
      var index = 0;
      Observable.from(this.prodotti)
        .concatMap((prodotto) =>
          this.CategoriaService.getById(prodotto.categoria_id)
        )
        .subscribe(
          (response) => {
            this.prodotti[index].categoria = response;
            index++;
          },
          (err) => {},
          () => {
            this.showLoading = false;
          }
        );
    });
  }

  ngOnInit(): void {
    this.getProdotti();
    this.getCategorie();
  }

  eliminaProdotto(prodotto: Prodotto) {
    this.confirmationService.confirm({
      message: 'Vuoi rimuovere ' + prodotto.nome + ' dal catalogo?',
      header: 'Conferma eliminazione',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showLoading = true;
        this.ProdottiService.remove(prodotto.id).subscribe((response) => {
          this.getProdotti();
        });
      },
    });
  }

  getCategorie() {
    this.CategoriaService.getAll().subscribe((response) => {
      this.categorie = response;
    });
  }

  nuovoProdotto() {
    this.getCategorie();
    this.formAggiunta = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descrizione: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      prezzo: new FormControl(1, [Validators.required, Validators.min(1)]),
      sconto: new FormControl(0, [Validators.required]),
      quantita: new FormControl(1, [Validators.required, Validators.min(1)]),
      minOrd: new FormControl('', [Validators.required, Validators.min(1)]),
      maxOrd: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      nomeCategoria: new FormControl('')
    });
    this.dialAggiunta = true;
  }

  nuovaCategoria() {    
    this.CategoriaService.addNew({
      nome: this.formAggiunta.get('nomeCategoria').value,
    }).subscribe((response) => {
      this.categorie.push(response);
    });
  }

  salvaProdotto() {
    this.dialAggiunta = false;
    this.showLoading = true;

    let newProdotto: Prodotto = this.formAggiunta.value;
    newProdotto.categoria_id = this.formAggiunta.get('categoria').value.id;
    delete newProdotto.categoria;

    this.ProdottiService.addNew(newProdotto).subscribe((response) => {
      this.getProdotti();
    });
  }
}
