import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TrainerService } from '../services/trainer.service'; // Import TrainerService
import { TrainerListComponent } from './trainer-list.component'; // Adjust the import path
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Trainer } from '../models/trainer.model'; // Import Trainer model

describe('TrainerListComponent', () => {
    let component: TrainerListComponent;
    let fixture: ComponentFixture<TrainerListComponent>;
    let mockTrainerService: jasmine.SpyObj<TrainerService>; // Specify the type of mock

    beforeEach(waitForAsync(() => {
        // Create a spy object with the methods you want to mock
        mockTrainerService = jasmine.createSpyObj<TrainerService>('TrainerService', ['getTrainers', 'deleteTrainer', 'getSortedTrainers']);

        TestBed.configureTestingModule({
            declarations: [TrainerListComponent],
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                // Provide the mock service instead of the actual service
                { provide: TrainerService, useValue: mockTrainerService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TrainerListComponent);
        component = fixture.componentInstance;
    });

    fit('should_create_TrainerListComponent', () => { // Update description
        expect((component as any)).toBeTruthy();
    });

    fit('TrainerListComponent_should_call_loadTrainers_on_ngOnInit', () => { // Update method name
        spyOn((component as any), 'loadTrainers'); // Adjust the method name
        fixture.detectChanges();
        expect(component.loadTrainers).toHaveBeenCalled(); // Adjust the method name
    });

    fit('TrainerListComponent_should_have_sortTrainersBySessionFee_method', () => { // Update method name
        expect((component as any).sortTrainersBySessionFee).toBeDefined();
    });
});
