import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Path } from 'src/models/path.enum';
import { Utente } from 'src/models/utente.model';
import { UtenteService } from '../utente.service';
const moment = require('moment');

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signUpForm;
  showLoading: boolean;
  error: boolean;
  passwordError: boolean;

  constructor(private UtenteService: UtenteService, private router: Router) {}

  initForm() {
    this.signUpForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      cognome: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required]),
      dataNascita: new FormControl('', [Validators.required]),
      siglaResidenza: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confermaPassword: new FormControl('', [Validators.required]),
    });
  }

  checkPassword(): boolean {
    if (
      this.signUpForm.get("password").value == this.signUpForm.get("confermaPassword").value
    ) {
      return true;
    } else {
      return false;
    }
  }

  convertDate(dataOriginale: Date): Date {
    let nuovaData = moment(dataOriginale).format('YYYY-MM-DD');
    return nuovaData;
  }

  register() {
    console.log(this.signUpForm.value);
    //console.log(this.signUpForm.password.value);
    
    
    if (this.checkPassword()) {
      this.showLoading = true;
      let dataNascita = this.convertDate(this.signUpForm.get("dataNascita").value);
      let nuovoUtente = new Utente();
      nuovoUtente.nome = this.signUpForm.get("nome").value;
      nuovoUtente.cognome = this.signUpForm.get("cognome").value;
      nuovoUtente.username = this.signUpForm.get("username").value;
      nuovoUtente.mail = this.signUpForm.get("mail").value;
      nuovoUtente.dataNascita = dataNascita;
      nuovoUtente.siglaResidenza = this.signUpForm.get("siglaResidenza").value;
      nuovoUtente.password = this.signUpForm.get("password").value;

      this.UtenteService.register(nuovoUtente).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate([Path.Login]);
        },
        (error) => {
          this.error = true;
          this.showLoading = false;
        },
        () => {
          this.showLoading = false;
        }
      );
    } else {
      this.passwordError = true;
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  navHome(){
    this.router.navigate([Path.Mainpage]);
  }
}
