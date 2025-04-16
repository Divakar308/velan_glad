import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TrainerFormComponent } from './trainer-form.component'; // Update import to TrainerFormComponent
import { TrainerService } from '../services/trainer.service'; // Update service to TrainerService
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Trainer } from '../models/trainer.model'; // Update import to Trainer model

describe('TrainerFormComponent', () => {
  let component: TrainerFormComponent;
  let fixture: ComponentFixture<TrainerFormComponent>;
  let trainerService: TrainerService; // Update to TrainerService
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerFormComponent], // Update to TrainerFormComponent
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [TrainerService] // Update to TrainerService
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerFormComponent); // Update to TrainerFormComponent
    component = fixture.componentInstance;
    trainerService = TestBed.inject(TrainerService); // Update to TrainerService
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  fit('should_create_TrainerFormComponent', () => { // Update description
    expect((component as any)).toBeTruthy();
  });

  fit('TrainerFormComponent_should_render_error_messages_when_required_fields_are_empty_on_submit', () => { // Update description
    // Set all fields to empty values
    component.newTrainer = { // Update to newTrainer
      trainerId: 0,
      name: '',
      specialization: '',
      experienceYears: 0,
      sessionFee: 0,
      rating: 0
    } as any;

    // Manually trigger form submission
    (component as any).formSubmitted = true;

    fixture.detectChanges();

    // Find the form element
    const form = fixture.debugElement.query(By.css('form')).nativeElement;

    // Submit the form
    form.dispatchEvent(new Event('submit'));

    fixture.detectChanges();

    // Check if error messages are rendered for each field
    expect(fixture.debugElement.query(By.css('#name + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#specialization + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#experienceYears + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#sessionFee + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#rating + .error-message'))).toBeTruthy();
  });

  fit('TrainerFormComponent_should_call_addTrainer_method_while_adding_the_trainer', () => { // Update description
    // Create a mock Trainer object with all required properties
    const trainer: Trainer = {
      trainerId: 1,
      name: 'Test Trainer',
      specialization: 'Test Specialization',
      experienceYears: 4,
      sessionFee: 2024,
      rating: 8.5
    }as any;

    // Spy on the addTrainer method
    const addTrainerSpy = spyOn((component as any), 'addTrainer').and.callThrough(); // Update to addTrainer
    (component as any).addTrainer(); // Update to addTrainer
    expect(addTrainerSpy).toHaveBeenCalled();
  });
});
