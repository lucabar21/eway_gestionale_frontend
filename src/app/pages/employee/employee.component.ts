import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-employee',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SpinnerComponent,
  ],
  providers: [UserService],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  employee: any;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id'); // L'ID dalla route è sempre una stringa

      if (!id) {
        console.error('Errore: ID mancante dalla route', id);
        return;
      }

      // Controlla se l'ID è numerico (MySQL) o stringa con lunghezza 24 (MongoDB)
      if (this.isValidMySQLId(id)) {
        this.getEmployeeById(id); // Passa l'ID numerico
      } else if (this.isValidMongoId(id)) {
        this.getEmployeeByMongoId(id); // Passa l'ID stringa
      } else {
        console.error('Errore: ID non valido', id);
      }
    });
  }

  isValidMySQLId(id: string): boolean {
    // Verifica che l'ID sia un numero valido per MySQL
    return !isNaN(Number(id));
  }

  isValidMongoId(id: string): boolean {
    // Verifica che l'ID sia una stringa di lunghezza 24 per MongoDB
    return id.length === 24;
  }

  getEmployeeById(employeeId: string) {
    this.loading = true;
    this.userService.getEmployee(employeeId).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
        console.log('Dipendente ricevuto (MySQL):', this.employee);
      },
      error: (err) => {
        this.loading = false;
        console.error('Errore nella richiesta (MySQL):', err);
      },
    });
  }

  getEmployeeByMongoId(employeeId: string) {
    this.loading = true;
    this.userService.getEmployee(employeeId).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
        console.log('Dipendente ricevuto (MongoDB):', this.employee);
      },
      error: (err) => {
        this.loading = false;
        console.error('Errore nella richiesta (MongoDB):', err);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
