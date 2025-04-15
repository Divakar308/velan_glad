import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternshipService } from 'src/app/services/internship.service';

@Component({
  selector: 'app-userappliedinternship',
  templateUrl: './userappliedinternship.component.html',
  styleUrls: ['./userappliedinternship.component.css']
})

export class UserappliedinternshipComponent implements OnInit {

  showDeletePopup = false;
  internshipToDelete: any = null;
  appliedInternships: any[] = [];
  filteredInternships: any[] = [];
  searchValue = '';
  sortValue = 0;
  page = 1;
  limit = 5;
  maxRecords = 1;
  showResumeModal = false;         // Flag to show the modal
  resumeSrc: any; 

  constructor(private internshipService: InternshipService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  viewResume(resumeBase64: string): void {
    this.resumeSrc = resumeBase64;
    this.showResumeModal = true;
  }

  // Close the resume modal
  closeResumeModal(): void {
    this.showResumeModal = false;
    this.resumeSrc = ''; // Reset the resume content
  }

  fetchData(): void {
    // Replace 'userId' with the actual user ID
    const userId = Number(localStorage.getItem('userId'));
    this.internshipService.getAppliedInternships(userId).subscribe(
      (response: any) => {
        this.appliedInternships = response;
        console.log('User Applied internships:', this.appliedInternships);
        this.filteredInternships = response;
        this.maxRecords = response.length;
      },
      (error) => {
        console.error('Error fetching data:', error);
        // Handle error appropriately
      }
    );
  }

  totalPages(): number {
    return Math.ceil(this.maxRecords / this.limit);
  }

filterInternships(): void {
  const searchLower = this.searchValue ? this.searchValue.toLowerCase() : '';
  if (searchLower === '') {
    this.filteredInternships = [...this.appliedInternships];
  } else {
    this.filteredInternships = this.appliedInternships.filter((internship) =>
      internship.Internship && internship.Internship.CompanyName && internship.Internship.CompanyName.toLowerCase().includes(searchLower)
    );
  }
  this.maxRecords = this.filteredInternships.length;
}

  toggleSort(order: number): void {
    this.sortValue = order;

    this.filteredInternships.sort((a, b) => {
      return order === 1
        ? new Date(a.submissionDate).getTime() -
            new Date(b.submissionDate).getTime()
        : order === -1
        ? new Date(b.submissionDate).getTime() -
          new Date(a.submissionDate).getTime()
        : 0;
    });
  }


handleDeleteClick(internship: any): void {
    this.internshipToDelete = internship;
    this.showDeletePopup = true;
}

handleConfirmDelete(): void {
    this.internshipService
        .deleteInternshipApplication(this.internshipToDelete.InternshipApplicationId)
        .subscribe((response) => {
            console.log('Internship deleted successfully', response);
            this.fetchData();
            this.closeDeletePopup();
        });
}


  closeDeletePopup(): void {
    this.internshipToDelete = null;
    this.showDeletePopup = false;
  }


}
