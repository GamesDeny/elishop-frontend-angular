import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from 'src/models/feedback.model';
import { Utente } from 'src/models/utente.model';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-user-feedbacks',
  templateUrl: './user-feedbacks.component.html',
  styleUrls: ['./user-feedbacks.component.css'],
})
export class UserFeedbacksComponent implements OnInit {
  @Input() utente: Utente;

  feedbacks: Feedback[];
  selectedFeedback: Feedback;
  showLoading: boolean;
  showDialog: boolean;

  constructor(private UtenteService: UtenteService) {}

  getFeedbacks() {
    this.showLoading = true;
    this.UtenteService.getFeedbacks(this.utente.id).subscribe((response) => {
      this.feedbacks = response;
      this.showLoading = false;
      console.log(this.feedbacks);
    });
  }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  showFeedback(feedback) {
    this.selectedFeedback = feedback;
    this.showDialog = true;
  }
}
