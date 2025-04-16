import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from '../models/trainer.model';
import { TrainerService } from '../services/trainer.service';

@Component({
  selector: 'app-trainer-form',
  templateUrl: './trainer-form.component.html',
  styleUrls: ['./trainer-form.component.css']
})
export class TrainerFormComponent {
  newTrainer: Trainer = {
    trainerId: 0,
    name: '',
    specialization: '',
    experienceYears: 0,
    sessionFee: 0,
    rating: 0
  };
  formSubmitted = false;

  constructor(private trainerService: TrainerService, private router: Router) { }

  addTrainer(): void {
    this.formSubmitted = true; // Set formSubmitted to true on form submission
    if (this.isFormValid()) {
      this.trainerService.addTrainer(this.newTrainer).subscribe(() => {
        console.log('Trainer added successfully!');
        this.router.navigate(['/viewTrainers']); // Adjusted navigation path
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const fieldValue = this.newTrainer[fieldName as keyof Trainer];
    return !fieldValue && this.formSubmitted;
  }

  isFormValid(): boolean {
    return !this.isFieldInvalid('name') && !this.isFieldInvalid('specialization') &&
      !this.isFieldInvalid('experienceYears') && !this.isFieldInvalid('sessionFee') &&
      !this.isFieldInvalid('rating');
  }
}
