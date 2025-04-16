import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from '../models/trainer.model';
import { TrainerService } from '../services/trainer.service';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.component.html',
  styleUrls: ['./trainer-list.component.css']
})

export class TrainerListComponent implements OnInit {
  trainers: Trainer[] = [];

  constructor(private trainerService: TrainerService, private router: Router) { }

  ngOnInit() {
    this.loadTrainers();
  }

  loadTrainers(): void {
    this.trainerService.getTrainers().subscribe(trainers => {
      this.trainers = trainers;
    });
  }

  deleteTrainer(trainerId: number): void { // Changed from deleteArt to deleteTrainer
    this.router.navigate(['/confirmDelete', trainerId]);
  }

  sortTrainersBySessionFee(): void { // Changed to sortTrainersBySessionFee
    this.trainerService.getSortedTrainers().subscribe(sortedTrainers => {
      this.trainers = sortedTrainers;
    });
  }
}
