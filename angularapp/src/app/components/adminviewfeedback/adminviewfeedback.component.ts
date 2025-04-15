import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';


@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})

export class AdminviewfeedbackComponent implements OnInit {
  feedbacks = [];
  showProfilePopup = false;
  selectedUser = null;


  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (response) => {
        this.feedbacks = response;
      },
      (error) => {
        console.error('Error:', error);
        // Handle error
      }
    );
  }

  showProfile(user): void {
    this.selectedUser = user;
    this.showProfilePopup = true;
  }

  closeProfilePopup(): void {
    this.showProfilePopup = false;
  }
}
