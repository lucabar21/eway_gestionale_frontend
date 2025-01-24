import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  //GET tutti i progetti
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + 'projects');
  }

  // GET singolo progetto
  getProject(id: string): Observable<any> {
    return this.http.get<any>(this.URL + 'projects' + id);
  }

  //GET tutti i dipendenti
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + 'employees');
  }

  // GET singolo dipendente
  getEmployee(id: string): Observable<any> {
    return this.http.get<any>(this.URL + 'employees' + id);
  }

  //GET tutti i segnalazioni
  getReports(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + 'reports');
  }

  // GET singolo segnalazione
  getReport(id: string): Observable<any> {
    return this.http.get<any>(this.URL + 'reports' + id);
  }
}
