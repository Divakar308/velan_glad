import { Trainer } from './trainer.model'; // Import Trainer model

describe('Trainer', () => { // Updated description to 'Trainer'
  fit('should_create_trainer_instance', () => { // Updated test description
    const trainer: Trainer = { // Changed 'equipment' to 'trainer'
      trainerId: 1,
      name: 'Test Trainer',
      specialization: 'Test Specialization',
      experienceYears: 4,
      sessionFee: 5000,
      rating: 4.5
    }as any;

    // Check if the trainer object exists
    expect(trainer).toBeTruthy();

    // Check individual properties of the trainer
    expect(trainer.trainerId).toBe(1);
    expect(trainer.name).toBe('Test Trainer');
    expect(trainer.specialization).toBe('Test Specialization');
    expect(trainer.experienceYears).toBe(4);
    expect(trainer.sessionFee).toBe(5000);
    expect(trainer.rating).toBe(4.5);
  });
});
