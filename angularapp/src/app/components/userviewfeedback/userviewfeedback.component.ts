import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})

export class UserviewfeedbackComponent implements OnInit {
  feedbacks: any[] = [];
  showDeletePopup = false;
  feedbackToDelete: number;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.getAllLoansByUserId();
  }

  getAllLoansByUserId() {
    const userId = Number(localStorage.getItem('userId'));
    this.feedbackService.getAllfeedbacksByUserId(userId).subscribe(
      (data: any) => {
        this.feedbacks = data;
        console.log(this.feedbacks);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteFeedback(feedbackId: number) {
    this.feedbackService.deleteFeedback(feedbackId).subscribe(
      (response) => {
        console.log('Feedback deleted:', response);
        // Refresh the feedbacks
        this.getAllLoansByUserId();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  openDeletePopup(feedbackId: number) {
    this.showDeletePopup = true;
    this.feedbackToDelete = feedbackId;
  }

  closeDeletePopup() {
    this.showDeletePopup = false;
  }

  handleConfirmDelete() {
    this.deleteFeedback(this.feedbackToDelete);
    this.closeDeletePopup();
  }
}
