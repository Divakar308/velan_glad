import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { InternshipService } from 'src/app/services/internship.service';

@Component({
  selector: 'app-requestedinternship',
  templateUrl: './requestedinternship.component.html',
  styleUrls: ['./requestedinternship.component.css'],
})
export class RequestedinternshipComponent implements OnInit {
  internshipRequests: any[] = [];
  filteredInternships: any[] = [];
  searchValue = '';
  statusFilter = 'All'; // All statuses by default
  page = 1;
  pageSize = 2;
  expandedRow: number | null = null;
  showModal = false;
  selectedInternship: any = null;
  showResumeModal = false;         // Flag to show the modal
  resumeSrc: any; 
  showChart = false;
  

  constructor(private internshipService: InternshipService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  // Fetch all internship applications from the service
  fetchData(): void {
    this.internshipService.getAllInternshipApplications().subscribe(
      (response) => {
        this.internshipRequests = response;
        console.log('Internship requests:', this.internshipRequests);
        this.filteredInternships = [...this.internshipRequests]; // Initialize the filtered list
        console.log('Internship requests:', this.internshipRequests);
      },
      (error) => {
        console.error('Error fetching internships:', error);
        // Handle error appropriately
      }
    );
  }

  // Search functionality to filter internships by Internship Type
  handleSearchChange(event: any): void {
    this.searchValue = event.target.value.toLowerCase();
    this.filteredInternships = this.internshipRequests.filter((internship) =>
      internship.DegreeProgram.toLowerCase().includes(this.searchValue)
    );
  }

  // Filter internships based on their status (Pending, Approved, Rejected)

handleFilterChange(event: any): void {
  this.statusFilter = event.target.value;
  this.filteredInternships = this.internshipRequests.filter((internship) => {
    if (this.statusFilter === 'All') {
      // If 'All' is selected, return all internships
      return true;
    } else {
      // Return only internships matching the selected status
      return internship.ApplicationStatus === this.statusFilter;
    }
  });
}


  // Approve a internship application
  handleApprove(internshipApplication: any): void {
    internshipApplication.ApplicationStatus = 'Approved'; // Status for Approved
    this.updateApplicationStatus(internshipApplication);
  }

  // Reject a internship application
  handleReject(internshipApplication: any): void {
    internshipApplication.ApplicationStatus = 'Rejected'; // Status for Rejected
    this.updateApplicationStatus(internshipApplication);
  }

  // Update internship status via the InternshipService
  updateApplicationStatus(internshipApplication: any): void {
    this.internshipService.updateApplicationStatus(internshipApplication.InternshipApplicationId, internshipApplication).subscribe(
      (response) => {
        console.log('Internship status updated:', response);
        this.fetchData(); // Refresh data after status update
      },
      (error) => {
        console.error('Error updating internship status:', error);
        // Handle error appropriately
      }
    );
  }

  // Expand row to show more details
  handleRowExpand(index: number): void {

    const selected = this.internshipRequests[index];
    console.log("Selected:", selected);
    this.expandedRow = this.expandedRow === index ? null : index;
    this.selectedInternship = selected;
    this.showModal = !this.showModal;
  }


  closeInternshipDetailsModal(): void {
    this.showModal = false; // hide the modal
  }


  // Handle pagination (if needed)
  handlePagination(direction: number): void {
    if (direction === -1 && this.page > 1) {
      this.page -= 1;
    } else if (direction === 1 && this.page < Math.ceil(this.internshipRequests.length / this.pageSize)) {
      this.page += 1;
    }
    this.fetchData(); // Refresh data for the current page
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

  navigateToChart() {
    const navigationExtras: NavigationExtras = {
      state: { applications: this.filteredInternships } // Pass applications
    };
    this.router.navigate(['/internshippiechart'], navigationExtras);
  }

}
