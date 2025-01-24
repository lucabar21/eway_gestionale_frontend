import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-employees',
  imports: [CommonModule, HeaderComponent, FooterComponent, SidebarComponent],
  providers: [UserService, DatePipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }
}
