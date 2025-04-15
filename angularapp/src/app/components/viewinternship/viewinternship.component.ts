import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternshipService } from '../../services/internship.service';

@Component({
  selector: 'app-viewinternship',
  templateUrl: './viewinternship.component.html',
  styleUrls: ['./viewinternship.component.css']
})
export class ViewinternshipComponent implements OnInit {
  availableInternships: any[] = [];
  showDeletePopup = false;
  internshipToDelete: number | null = null;
  searchValue = '';
  sortValue = 0;
  page: number = 1;
  limit = 5;
  maxRecords = 1;
  totalPages = 1;
  status: string = ''; // For handling loading state
  filteredInternships = [];
  searchField = '';
  errorMessage: string = '';
  allInternships: any[] = []; // Declare the allInternships property

  constructor(private router: Router, private internshipService: InternshipService) {}

  ngOnInit(): void {
    this.fetchAvailableInternships();
  }

  fetchAvailableInternships() {
    this.internshipService.getAllInternships().subscribe(
      (data: any) => {
        this.availableInternships = data;
        this.maxRecords = this.availableInternships.length;
        this.allInternships = data; // Populate allInternships with the initial list of internships
        this.totalPages = Math.ceil(this.maxRecords / this.limit);
        console.log('Available internships:', this.availableInternships);
      },
      (error) => {
        console.error('Error fetching internships:', error);
      }
    );
  }

  handleDeleteClick(internshipId: number) {
    this.internshipToDelete = internshipId;
    this.showDeletePopup = true;
  }

  navigateToEditInternship(id: string) {
    this.router.navigate(['/admin/editinternship', id]);
  }

  handleConfirmDelete() {
    if (this.internshipToDelete) {
      this.internshipService.deleteInternship(this.internshipToDelete).subscribe(
        (response) => {
          console.log('Internship deleted successfully', response);
          this.closeDeletePopup();
          this.fetchAvailableInternships();
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting internship:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  closeDeletePopup() {
    this.internshipToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  updateAvailableInternships(newInternships: any[]) {
    this.availableInternships = newInternships;
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    if (searchValue) {
      this.availableInternships = this.filterInternships(searchValue);
    } else {
      this.availableInternships = this.allInternships;
    }
  }

  filterInternships(search: string) {
    const searchLower = search.toLowerCase();
    if (searchLower === '') return this.availableInternships;
    return this.availableInternships.filter(
      (internship) =>
        internship.CompanyName.toLowerCase().includes(searchLower) ||
        internship.Location.toLowerCase().includes(searchLower)
    );
  }
}
