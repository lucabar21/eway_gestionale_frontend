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
    this.route.params.subscribe((params) => {
      const reportId = +params['id'];
      this.getReport(reportId);
    });
  }

  getReport(id: number) {
    this.loading = true;
    this.userService.getReport(id.toString()).subscribe((data) => {
      this.report = data;
      this.loading = false;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
