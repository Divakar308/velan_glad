import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InternshipService } from 'src/app/services/internship.service';
import { Internship } from 'src/app/models/internship.model'; // Import the Internship model

@Component({
  selector: 'app-admineditinternship',
  templateUrl: './admineditinternship.component.html',
  styleUrls: ['./admineditinternship.component.css']
})
export class AdmineditinternshipComponent implements OnInit {
  id: number;
  errorMessage: string = '';
  formData: Internship = { // Updated formData object with additional fields for internship
    Title: '',
    CompanyName: '',
    Location: '',
    DurationInMonths: null,
    Stipend: null,
    Description: '',
    SkillsRequired: '',
    ApplicationDeadline: ''
  };
  errors: any = {};
  successPopup: boolean; // Add this line to declare the successPopup property
  minDate: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private internshipService: InternshipService // Updated to use InternshipService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getInternshipById();
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  getInternshipById() {
    this.internshipService.getInternshipById(this.id).subscribe(
      (response) => {
        console.log('Internship details:', response);
        this.formData = {
          Title: response.Title,
          CompanyName: response.CompanyName,
          Location: response.Location,
          DurationInMonths: response.DurationInMonths,
          Stipend: response.Stipend,
          Description: response.Description,
          SkillsRequired: response.SkillsRequired,
          ApplicationDeadline: response.ApplicationDeadline
        };
      },
      (error) => {
        console.error('Error fetching internship details:', error);
        this.router.navigate(['/error']);
      }
    );
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
    this.errors[field] = ''; // Clear error when the user makes a change
  }

  handleUpdateInternship(internshipForm: NgForm) { // Updated method name for internship
    if (internshipForm.valid) {
      this.internshipService.updateInternship(this.id, this.formData).subscribe(
        (response) => {
          console.log('Internship updated successfully', response);
          this.successPopup = true;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error updating internship:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  handleOkClick() {
    this.successPopup = false;
    this.router.navigate(['/admin/view/viewinternship']); // Updated route to view internships
  }

  navigateToDashboard() {
    this.router.navigate(['/admin/view/viewinternship']); // Updated route to view internships
  }
}
