import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Feedback } from 'src/models/feedback.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Feedback[]>(`${environment.apiUrl}/feedback/all`);
  }

  addNew(feedback: Feedback) {
    return this.http.post(`${environment.apiUrl}/feedback/add`, feedback);
  }

  update(id, feedback) {
    return this.http.patch(
      `${environment.apiUrl}/feedback/update/${id}`,
      feedback
    );
  }
}
