import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Feedback } from 'src/models/feedback.model';
import { FeedbacksService } from '../feedbacks.service';
import { UtenteService } from '../utente.service';

@Component({
  selector: 'app-admin-feedbacks',
  templateUrl: './admin-feedbacks.component.html',
  styleUrls: ['./admin-feedbacks.component.css'],
  providers: [ConfirmationService],
})
export class AdminFeedbacksComponent implements OnInit {
  feedbacks: Feedback[];
  showLoading: boolean;
  selectedFeedback: Feedback;
  showDialog: boolean;

  constructor(
    private FeedbacksService: FeedbacksService,
    private UtenteService: UtenteService,
    private confirmationService: ConfirmationService
  ) {}

  getFeedbacks() {
    this.showLoading = true;
    this.FeedbacksService.getAll().subscribe((response) => {
      this.feedbacks = response;
      this.feedbacks.forEach((feedback) => {
        this.UtenteService.getById(feedback.utente_id).subscribe((response) => {
          feedback.utente = response;
        });
      });
      this.showLoading = false;
    });
  }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  showFeedback(feedback) {
    this.selectedFeedback = feedback;
    this.showDialog = true;
  }

  accetta(feedback: Feedback) {
    this.confirmationService.confirm({
      message: 'Accettare il feedback?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showLoading;
        delete feedback.utente;
        feedback.isAccepted = true;
        this.FeedbacksService.update(feedback.id, feedback).subscribe(
          (response) => {
            this.getFeedbacks();
          }
        );
      },
    });
  }
}
