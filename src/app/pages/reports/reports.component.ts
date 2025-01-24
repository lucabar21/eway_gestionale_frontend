import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, HeaderComponent, FooterComponent, SidebarComponent],
  providers: [UserService, DatePipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  reports: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getReports().subscribe((data) => {
      this.reports = data;
    });
  }
}
