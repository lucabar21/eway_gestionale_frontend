import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule, Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-report',
  imports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CommonModule,
    SpinnerComponent,
  ],
  providers: [UserService],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  report: any;
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
        this.getReportById(id); // Passa l'ID numerico
      } else if (this.isValidMongoId(id)) {
        this.getReportByMongoId(id); // Passa l'ID stringa
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

  getReportById(reportId: string) {
    this.loading = true;
    this.userService.getReport(reportId).subscribe({
      next: (data) => {
        this.report = data;
        this.loading = false;
        console.log('Report ricevuto (MySQL):', this.report);
      },
      error: (err) => {
        this.loading = false;
        console.error('Errore nella richiesta (MySQL):', err);
      },
    });
  }

  getReportByMongoId(reportId: string) {
    this.loading = true;
    this.userService.getReport(reportId).subscribe({
      next: (data) => {
        this.report = data;
        this.loading = false;
        console.log('Report ricevuto (MongoDB):', this.report);
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
