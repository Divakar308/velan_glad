import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/apiconfig';
import { Internship } from '../models/internship.model';
import { InternshipApplication } from '../models/internshipapplication.model';

@Injectable({
  providedIn: 'root'
})

export class InternshipService {
  public apiUrl = apiUrl; // Update with your API URL

  constructor(private http: HttpClient) { }

  getAllInternships(): Observable<Internship[]> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Internship[]>(`${this.apiUrl}/api/internship`, { headers });
  }

deleteInternship(internshipId: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<void>(`${this.apiUrl}/api/internship/${internshipId}`, { headers });
}

  getInternshipById(id: number): Observable<Internship> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<Internship>(`${this.apiUrl}/api/internship/${id}`, { headers });
}

  addInternship(requestObject: Internship): Observable<Internship> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<Internship>(`${this.apiUrl}/api/internship`, requestObject, { headers });
  }

updateInternship(id: number, requestObject: Internship): Observable<Internship> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<Internship>(`${this.apiUrl}/api/internship/${id}`, requestObject, { headers });
}


  getAppliedInternships(userId: number): Observable<InternshipApplication[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<InternshipApplication[]>(`${this.apiUrl}/api/internship-application/user/${userId}`, { headers });
}

  deleteInternshipApplication(internshipId: number): Observable<void> {
    console.log('deleteinternshipId', internshipId);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<void>(`${this.apiUrl}/api/internship-application/${internshipId}`, { headers });
  }


  addInternshipApplication(data: InternshipApplication): Observable<InternshipApplication> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post<InternshipApplication>(`${this.apiUrl}/api/internship-application`, data, { headers });
}


getAllInternshipApplications(): Observable<InternshipApplication[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get<InternshipApplication[]>(`${this.apiUrl}/api/internship-application`, { headers });
}

updateApplicationStatus(id: number, internshipApplication: InternshipApplication): Observable<InternshipApplication> {
    console.log('updateApplicationStatus', id, internshipApplication);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put<InternshipApplication>(`${this.apiUrl}/api/internship-application/${id}`, internshipApplication, { headers });
}
}
