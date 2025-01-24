import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardComponent } from '../../components/card/card.component';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    HeaderComponent,
    CommonModule,
    FooterComponent,
    SidebarComponent,
    CardComponent,
  ],
  providers: [UserService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  projects: any[] = [];
  employees: any[] = [];
  reports: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getProjects();
    this.getEmployees();
    this.getReports();
  }

  getProjects() {
    this.userService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }
  getEmployees() {
    this.userService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }
  getReports() {
    this.userService.getReports().subscribe((data) => {
      this.reports = data;
    });
  }
}
