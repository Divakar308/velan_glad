import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainerService } from '../services/trainer.service'; // Updated to TrainerService
import { Trainer } from '../models/trainer.model'; // Updated to Trainer model

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {
  trainerId: number; // Updated to trainerId
  trainer: Trainer = {} as Trainer; // Initialize trainer property with an empty object

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainerService: TrainerService // Updated to TrainerService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.trainerId = +params['id']; // Get trainerId from route params
      this.trainerService.getTrainerById(this.trainerId).subscribe(
        (trainer: Trainer) => {
          this.trainer = trainer;
        },
        error => {
          console.error('Error fetching trainer:', error);
        }
      );
    });
  }

  confirmDelete(trainerId: number): void { // Updated method signature
    this.trainerService.deleteTrainer(trainerId).subscribe(
      () => {
        console.log('Trainer deleted successfully.');
        this.router.navigate(['/viewTrainers']); // Navigate to the trainers list after deletion
      },
      (error) => {
        console.error('Error deleting trainer:', error);
      }
    );
  }

  cancelDelete(): void {
    this.router.navigate(['/viewTrainers']); // Navigate to the trainers list on cancel
  }
}
