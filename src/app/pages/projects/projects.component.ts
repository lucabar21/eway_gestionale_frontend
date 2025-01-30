import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UserService } from '../../services/user.service';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from '../../components/modal/modal.component';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ModalComponent,
    SpinnerComponent,
  ],
  providers: [UserService, DatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  employees: any[] = [];

  isDisplayed: boolean = false;
  loading: boolean = false;

  activeTab = 0; // Indice del tab attivo

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getEmpolyees();
    this.getProjects();
  }

  // Filtra i dipendenti appartenenti al progetto
  getEmployeesForActiveProject(): any[] {
    if (!this.projects.length) return [];
    return this.projects[this.activeTab]?.employees || [];
  }

  getProjects() {
    this.loading = true;
    this.userService.getProjects().subscribe((data) => {
      this.projects = data;
      this.loading = false;
    });
  }

  getEmpolyees() {
    this.loading = true;
    this.userService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.loading = false;
    });
  }

  toggleModal() {
    this.isDisplayed = !this.isDisplayed;
  }

  goToElement(id: number) {
    this.router.navigate(['/project', id]);
  }
}
