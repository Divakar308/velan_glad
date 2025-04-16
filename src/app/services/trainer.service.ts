import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer.model'; // Update import to Trainer

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private apiUrl = 'https://8080-bbefdebbdfedacd323990932fbbecbcccedtwo.premiumproject.examly.io'; // Replace this with your API endpoint

  constructor(private http: HttpClient) { }

  // Add new trainer
  addTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(`${this.apiUrl}/api/Trainer`, trainer);
  }

  // Get all trainers
  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.apiUrl}/api/Trainer`);
  }

  // Delete trainer by ID
  deleteTrainer(trainerId: number): Observable<void> {
    const url = `${this.apiUrl}/api/Trainer/${trainerId}`;
    return this.http.delete<void>(url);
  }

  // Get trainer by ID
  getTrainerById(trainerId: number): Observable<Trainer> {
    const url = `${this.apiUrl}/api/Trainer/${trainerId}`;
    return this.http.get<Trainer>(url);
  }

  // Get sorted trainers by title in descending order
  getSortedTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.apiUrl}/api/Trainer/sort`);
  }
}
