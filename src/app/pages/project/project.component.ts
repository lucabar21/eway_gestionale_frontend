import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule, Location } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-project',
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    SpinnerComponent,
  ],
  providers: [UserService],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  project: any;
  projects: any[] = [];

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
        this.getProjectById(id); // Passa l'ID numerico
      } else if (this.isValidMongoId(id)) {
        this.getProjectByMongoId(id); // Passa l'ID stringa
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

  getProjectById(projectId: string) {
    this.loading = true;
    this.userService.getProject(projectId).subscribe({
      next: (data) => {
        this.project = data;
        this.loading = false;
        console.log('Progetto ricevuto (MySQL):', this.project);
      },
      error: (err) => {
        this.loading = false;
        console.error('Errore nella richiesta (MySQL):', err);
      },
    });
  }

  getProjectByMongoId(projectId: string) {
    this.loading = true;
    this.userService.getProject(projectId).subscribe({
      next: (data) => {
        this.project = data;
        this.loading = false;
        console.log('Progetto ricevuto (MongoDB):', this.project);
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
