import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Path } from 'src/models/path.enum';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm;
  showLoading: boolean;
  error: boolean;

  constructor(private UtenteService: UtenteService, private router: Router) {}

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.showLoading = true;
    console.log(this.loginForm.value);
    this.UtenteService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        sessionStorage.setItem('utente', JSON.stringify(response));
        if (response.isAdmin) {
          this.router.navigate([Path.AdminTabs]);
        } else {
          this.router.navigate([Path.Mainpage]);
        }
      },
      (error) => {
        this.error = true;
      },
      () => {
        this.showLoading = false;
      }
    );
  }

  navToRegister() {
    this.router.navigate([Path.Register]);
  }

  navToHome() {
    this.router.navigate([Path.Mainpage]);
  }

  ngOnInit(): void {
    this.initForm();
  }
}
