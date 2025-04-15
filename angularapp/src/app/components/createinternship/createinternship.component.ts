import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Internship } from 'src/app/models/internship.model';
import { InternshipService } from 'src/app/services/internship.service';

@Component({
  selector: 'app-createinternship',  // Update the selector name
  templateUrl: './createinternship.component.html',  // Update the template file name
  styleUrls: ['./createinternship.component.css'],  // Update the stylesheet
})
export class CreateinternshipComponent implements OnInit {
  formData: Internship = {
    Title: '',
    CompanyName: '',
    Location: '',
    DurationInMonths: null,
    Stipend: null,
    Description: '',
    SkillsRequired: '',
    ApplicationDeadline: '',
  };
  errors: any = {};
  errorMessage: string;
  successPopup: boolean = false;
  minDate: string;

  constructor(private internshipService: InternshipService, private router: Router) {}

  ngOnInit(): void {
    // Initialization logic if needed
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
    // Validate form fields here if needed
  }

  onSubmit(internshipForm: NgForm) {
    console.log('Form Validity:', internshipForm.valid);
    if (internshipForm.valid) {
      this.internshipService.addInternship(this.formData).subscribe(
        (res) => {
          this.successPopup = true;
          console.log('Internship added successfully', res);
          internshipForm.resetForm();
        },
        (err) => {
          if (err.status === 500 && err.error.message === 'Company with the same name already exists') {
            this.errorMessage = 'Company with the same name already exists';
          } else {
            this.errors = err.error;
          }
          console.error('Error adding internship:', err);
        }
      );
    } else {
      this.errorMessage = 'All fields are required';
    }
  }

  handleSuccessMessage() {
    this.successPopup = false;
    this.errorMessage = '';
    this.formData = {
      Title: '',
      CompanyName: '',
      Location: '',
      DurationInMonths: null,
      Stipend: null,
      Description: '',
      SkillsRequired: '',
      ApplicationDeadline: '',
    };
  }
}
