import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { InternshipService } from 'src/app/services/internship.service';  // Assuming the service is renamed

@Component({
  selector: 'app-userviewinternship',
  templateUrl: './userviewinternship.component.html',
  styleUrls: ['./userviewinternship.component.css']
})
export class UserviewinternshipComponent implements OnInit {

  availableInternships: any[] = [];
  filteredInternships = [];
  searchValue: string = '';
  sortValue: number = 0;
  page: number = 1;
  searchField: string = '';  // Declaring searchField here
  limit: number = 5;
  appliedInternships: any[] = [];
  internships = [];

  constructor(private router: Router, private internshipService: InternshipService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const userId = Number(localStorage.getItem('userId'));

    forkJoin({
      appliedInternships: this.internshipService.getAppliedInternships(userId),
      allInternships: this.internshipService.getAllInternships()
    }).subscribe(
      ({ appliedInternships, allInternships }) => {
        this.appliedInternships = appliedInternships;
        this.availableInternships = allInternships.map((internship: any) => ({
          InternshipId: internship.InternshipId,
          Title: internship.Title,                     // Internship title
          Description: internship.Description,         // Internship description
          CompanyName: internship.CompanyName,         // Company offering the internship
          Location: internship.Location,               // Location of the internship
          DurationInMonths: internship.DurationInMonths, // Duration in months
          Stipend: internship.Stipend,                 // Monthly stipend
          SkillsRequired: internship.SkillsRequired,   // Required skills
          ApplicationDeadline: internship.ApplicationDeadline // Last date to apply
        }));
        this.filteredInternships = this.availableInternships;
        console.log('Applied internships:', this.appliedInternships);
        console.log('Available internships:', this.availableInternships);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    this.filteredInternships = this.filterInternships(searchValue);
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

  toggleSort(order: number) {
    this.sortValue = order;

    this.filteredInternships = [...this.filteredInternships].sort((a, b) => {
      if (order === 1) {
        return a.ExpectedReturn - b.ExpectedReturn;
      } else if (order === -1) {
        return b.ExpectedReturn - a.ExpectedReturn;
      } else {
        return 0;
      }
    });
  }

  handleApplyClick(internship: any) {
    const isInternshipApplied = this.isInternshipApplied(internship);

    if (isInternshipApplied) {
      alert('Internship is already applied.');
    } else {
      this.appliedInternships.push(internship); // Add the applied internship to the appliedInternships array
      localStorage.setItem('internshipId', internship.InternshipId.toString()); // Store internshipId in local storage
      this.router.navigate(['/user/internshipapplicationform']); // Navigate to internship application form
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredInternships.length / this.limit);
  }

  isInternshipApplied(internship: any): boolean {
    return this.appliedInternships.some(
      (appliedInternship) => appliedInternship.InternshipId === internship.InternshipId
    );
  }

  navigateToViewAppliedInternship() {
    this.router.navigate(['/appliedinternship']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isDeadlineExceeded(internship: any): boolean {
    const currentDate = new Date();
    const deadlineDate = new Date(internship.ApplicationDeadline);
    return deadlineDate < currentDate;
  }
  
}
