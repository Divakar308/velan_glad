import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TrainerService } from './trainer.service'; // Updated service import
import { Trainer } from '../models/trainer.model'; // Updated model import

describe('TrainerService', () => {
  let service: TrainerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrainerService], // Changed service provider to TrainerService
    });
    service = TestBed.inject(TrainerService); // Changed service variable assignment to TrainerService
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  fit('should_create_TrainerService_instance', () => { // Updated test description
    expect((service as any)).toBeTruthy();
  });

  fit('TrainerService_should_add_a_trainer_and_return_it', () => { // Updated test description
    const mockTrainer: Trainer = {
      trainerId: 100,
      name: 'Test Trainer',
      specialization: 'Test Specialization',
      experienceYears: 4,
      sessionFee: 5000,
      rating: 4.5
    }as any;

    (service as any).addTrainer(mockTrainer).subscribe((trainer) => {
      expect(trainer).toEqual(mockTrainer);
    });

    const req = httpTestingController.expectOne(`${(service as any)['apiUrl']}/api/Trainer`); // Updated API endpoint
    expect(req.request.method).toBe('POST');
    req.flush(mockTrainer);
  });

  fit('TrainerService_should_get_all_trainers', () => { // Updated test description
    const mockTrainerList: Trainer[] = [
      {
        trainerId: 100,
        name: 'Test Trainer',
        specialization: 'Test Specialization',
        experienceYears: 4,
        sessionFee: 5000,
        rating: 4.5
      }
    ]as any;

    (service as any).getTrainers().subscribe((trainerList) => {
      expect(trainerList).toEqual(mockTrainerList);
    });

    const req = httpTestingController.expectOne(`${(service as any)['apiUrl']}/api/Trainer`); // Updated API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(mockTrainerList);
  });

  fit('TrainerService_should_delete_a_trainer', () => { // Updated test description
    const trainerId = 100; // Changed to number

    (service as any).deleteTrainer(trainerId).subscribe(() => {
      expect().nothing();
    });

    const req = httpTestingController.expectOne(`${(service as any)['apiUrl']}/api/Trainer/${trainerId}`); // Updated API endpoint
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  fit('TrainerService_should_get_trainer_by_id', () => { // Updated test description
    const trainerId = 100; // Changed to number
    const mockTrainer: Trainer = {
      trainerId: 100,
        name: 'Test Trainer',
        specialization: 'Test Specialization',
        experienceYears: 4,
        sessionFee: 5000,
        rating: 4.5
    }as any;

    (service as any).getTrainerById(trainerId).subscribe((trainer) => {
      expect(trainer).toEqual(mockTrainer);
    });

    const req = httpTestingController.expectOne(`${(service as any)['apiUrl']}/api/Trainer/${trainerId}`); // Updated API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(mockTrainer);
  });

  fit('TrainerService_should_get_sorted_trainers', () => { // Updated test description
    const mockSortedTrainers: Trainer[] = [
      {
        trainerId: 101,
        name: 'Joe',
        specialization: 'Test Specialization',
        experienceYears: 5,
        sessionFee: 10000,
        rating: 5.0
      },
      {
        trainerId: 100,
        name: 'John',
        specialization: 'Test Specialization',
        experienceYears: 3,
        sessionFee: 2000,
        rating: 4.0
      }
    ]as any;

    (service as any).getSortedTrainers().subscribe((trainers) => {
      expect(trainers).toEqual(mockSortedTrainers);
    });

    const req = httpTestingController.expectOne(`${(service as any)['apiUrl']}/api/Trainer/sort`); // Updated API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(mockSortedTrainers);
  });
});
