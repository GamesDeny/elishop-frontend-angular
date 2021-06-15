import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Feedback } from 'src/models/feedback.model';
import { FeedbacksService } from '../feedbacks.service';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {

  formFeedback;
  showLoading: boolean;
  success: boolean;
  error: boolean;
  adding: boolean;

  constructor(private UtenteService: UtenteService, private FeedbacksService: FeedbacksService) { }

  initForm(){
    this.formFeedback = new FormGroup(
      {
        oggetto: new FormControl("", [Validators.required]),
        descrizione: new FormControl("", [Validators.required])
      }
    )
  }

  ngOnInit(): void {
    this.initForm();
  }

  checkUtente() {
    let utente = this.UtenteService.getLoggedUser();
    if (utente != null) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(){
    this.success = false;
    this.error = false;
    this.showLoading = true;
    let utente = this.UtenteService.getLoggedUser();
    let newFeedback = new Feedback();
    newFeedback.oggetto = this.formFeedback.get("oggetto").value;
    newFeedback.descrizione = this.formFeedback.get("descrizione").value;
    newFeedback.utente_id = utente.id;
    this.FeedbacksService.addNew(newFeedback).subscribe(
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

}
