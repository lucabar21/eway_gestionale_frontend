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

@Component({
  standalone: true,
  selector: 'app-projects',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ModalComponent,
  ],
  providers: [UserService, DatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  employees: any[] = [];

  isDisplayed: boolean = false;

  activeTab = 0; // Indice del tab attivo

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getEmpolyees();
    this.getProjects();
  }

  getProjects() {
    this.userService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  getEmpolyees() {
    this.userService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  toggleModal() {
    this.isDisplayed = !this.isDisplayed;
  }
}
