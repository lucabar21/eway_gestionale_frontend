import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = 'http://localhost:8000/api/reports'; // L'endpoint per il controller Report in Laravel

  constructor(private http: HttpClient) {}

  // Get all reports
  getReports(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Get a single report
  getReport(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Create a new report
  createReport(report: any): Observable<any> {
    return this.http.post(this.apiUrl, report);
  }

  // Update a report
  updateReport(id: number, report: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, report);
  }

  // Delete a report
  deleteReport(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
