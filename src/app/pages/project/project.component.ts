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
    this.route.params.subscribe((params) => {
      const projectId = +params['id'];
      this.getProject(projectId);
    });
  }

  getProject(projectId: number) {
    this.loading = true;
    this.userService.getProject(projectId.toString()).subscribe({
      next: (data) => {
        this.project = data;
        this.loading = false;
        console.log('Progetto ricevuto:', this.project);
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
