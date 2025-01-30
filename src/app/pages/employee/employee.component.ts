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
    this.route.params.subscribe((params) => {
      const employeeId = +params['id'];
      this.getEmployee(employeeId);
    });
  }

  getEmployee(employeeId: number) {
    this.loading = true;
    this.userService.getEmployee(employeeId.toString()).subscribe({
      next: (data) => {
        this.employee = data;
        this.loading = false;
        console.log('Dipendente ricevuto:', this.employee);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
