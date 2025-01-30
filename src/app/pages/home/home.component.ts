import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CardComponent } from '../../components/card/card.component';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    HeaderComponent,
    CommonModule,
    FooterComponent,
    SidebarComponent,
    CardComponent,
    RouterModule,
    SpinnerComponent,
  ],
  providers: [UserService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  projects: any[] = [];
  employees: any[] = [];
  reports: any[] = [];

  loading: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getProjects();
    this.getEmployees();
    this.getReports();
  }

  getProjects() {
    this.loading = true;
    this.userService.getProjects().subscribe((data) => {
      this.projects = data;
      this.loading = false;
    });
  }
  getEmployees() {
    this.loading = true;
    this.userService.getEmployees().subscribe((data) => {
      this.employees = data;
      this.loading = false;
    });
  }
  getReports() {
    this.loading = true;
    this.userService.getReports().subscribe((data) => {
      this.reports = data;
      this.loading = false;
    });
  }
}
