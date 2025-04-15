import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InternshipService } from 'src/app/services/internship.service';
import { Router } from '@angular/router';
import { InternshipApplication } from 'src/app/models/internshipapplication.model';

@Component({
  selector: 'app-internshipform',
  templateUrl: './internshipform.component.html',
  styleUrls: ['./internshipform.component.css']
})
export class InternshipformComponent implements OnInit {

  internshipForm: FormGroup;
  successPopup = false;
  errorMessage = "";
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private internshipService: InternshipService // Inject your internship service
  ) {
    this.internshipForm = this.fb.group({
      universityName: ['', Validators.required],            // University Name field
      degreeProgram: ['', Validators.required],             // Degree Program field
      resume: [null, Validators.required],                   // Resume file input
      linkedInProfile: [''],                                // LinkedIn Profile field (Optional)
      applicationStatus: ['Pending'],                       // Default Application Status
      applicationDate: [new Date().toISOString()],         // Date of Application submission
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.internshipForm.valid) {
      const formData = this.internshipForm.value;

      const requestObject: InternshipApplication = {
        UserId: Number(localStorage.getItem('userId')),
        InternshipId: Number(localStorage.getItem('internshipId')), // Assuming InternshipId is stored in localStorage
        UniversityName: formData.universityName,
        DegreeProgram: formData.degreeProgram,
        Resume: formData.resume,  // Resume is now base64-encoded file
        LinkedInProfile: formData.linkedInProfile || '',            // Optional LinkedIn Profile
        ApplicationStatus: formData.applicationStatus,             // Application Status
        ApplicationDate: formData.applicationDate,                 // Application Date (ISO string)
      };

      this.internshipService.addInternshipApplication(requestObject).subscribe(
        (response) => {
          console.log('Response:', response);
          this.successPopup = true;
        },
        (error) => {
          console.error('Error submitting internship application:', error);
          this.errorMessage = 'Error submitting internship application';
        }
      );
    } else {
      this.errorMessage = "All fields are required";
    }
  }

  handleFileChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.convertFileToBase64(file).then(
        (base64String) => {
          this.internshipForm.patchValue({
            resume: base64String,  // Storing the base64 content in the form control
          });
        },
        (error) => {
          console.error('Error converting file to base64:', error);
        }
      );
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  handleSuccessMessage(): void {
    this.successPopup = false;
    this.router.navigate(['/user/view/viewinternship']); // Redirect to internship view page
  }

  navigateBack(): void {
    this.router.navigate(['/user/view/viewinternship']); // Navigate back to the internship view page
  }
}
