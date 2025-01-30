import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/projects.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { ReportService } from '../../services/report.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  providers: [ProjectService, UserService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  isDisplayed: boolean = false;
  activeTab: number = 0; // Indice del tab attivo

  projects: any[] = [];
  employees: any[] = [];
  reports: any[] = [];

  project: any = { name: '', description: '', employees: [] };
  employeeForm: any = { name: '', surname: '', email: '', specialization: '' };
  report: any = { title: '', description: '', project_id: null };

  selectedEmployee: any = null;
  isEditing = false;
  currentReport: any = null;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private employeeService: EmployeeService,
    private reportService: ReportService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadEmployees();
    this.loadReports();
  }

  setActiveTab(index: number): void {
    this.activeTab = index;
  }

  /* PROJECTS METHODS START*/

  // Carica i progetti dal backend
  loadProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  // Gestisce il submit del form
  onSubmit(): void {
    if (this.isEditing) {
      this.projectService
        .updateProject(this.project.id, this.project)
        .subscribe(() => {
          this.loadProjects();
          this.resetProjectForm();
        });
    } else {
      this.projectService.createProject(this.project).subscribe(() => {
        this.loadProjects();
        this.resetProjectForm();
      });
    }
  }

  // Prepara il form per l'aggiornamento
  editProject(project: any): void {
    this.isEditing = true;
    this.project = {
      ...project,
      employees: project.employees.map((e: any) => e.id), // Solo gli ID
    };
  }

  // Elimina un progetto
  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(() => {
      this.loadProjects();
    });
  }

  // Annulla la modifica e resetta il form
  cancelProjectEdit(): void {
    this.resetProjectForm();
  }

  // Reset del form
  resetProjectForm(): void {
    this.isEditing = false;
    this.project = { name: '', description: '', employees: [] };
  }

  /* PROJECTS METHODS END*/

  /* EMPLOYEES METHODS START*/

  // Carica i dipendenti dal backend
  loadEmployees(): void {
    this.userService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  // Gestisce il submit del form
  onEmployeeSubmit() {
    if (this.selectedEmployee) {
      // Se un dipendente è selezionato, aggiorna
      this.updateEmployee();
    } else {
      // Altrimenti, crea un nuovo dipendente
      this.createEmployee();
    }
  }

  // Crea un nuovo dipendente
  createEmployee() {
    this.employeeService
      .createEmployee(this.employeeForm)
      .subscribe((response) => {
        this.loadEmployees(); // Ricarica la lista dei dipendenti
        this.employeeForm = {
          name: '',
          surname: '',
          email: '',
          specialization: '',
        }; // Reset del form
      });
  }

  // Aggiorna un dipendente esistente
  updateEmployee() {
    if (this.selectedEmployee) {
      this.employeeService
        .updateEmployee(this.selectedEmployee.id, this.employeeForm)
        .subscribe((response) => {
          this.loadEmployees(); // Ricarica la lista dei dipendenti
          this.selectedEmployee = null; // Reset della selezione
          this.employeeForm = {
            name: '',
            surname: '',
            email: '',
            specialization: '',
          }; // Reset del form
        });
    }
  }

  // Seleziona un dipendente per modificarlo
  editEmployee(employee: any) {
    this.selectedEmployee = employee;
    this.employeeForm = { ...employee }; // Pre-carica i dati del dipendente nel form
  }

  // Elimina un dipendente
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe((response) => {
      this.loadEmployees(); // Ricarica la lista dei dipendenti
    });
  }

  // Annulla la modifica e resetta il form
  cancelEmployeeEdit(): void {
    this.resetEmployeeForm();
  }

  // Reset del form
  resetEmployeeForm(): void {
    this.selectedEmployee = false;
    this.employeeForm = {
      name: '',
      surname: '',
      email: '',
      specialization: '',
    };
  }

  /* EMPLOYEES METHODS END*/

  /* REPORTS METHODS START*/

  // Carica tutti i report
  loadReports() {
    this.reportService.getReports().subscribe((data) => {
      this.reports = data;
    });
  }

  onReportSubmit(): void {
    if (this.isEditing) {
      this.reportService
        .updateReport(this.report.id, this.report)
        .subscribe(() => {
          this.loadReports();
          this.resetReportForm();
        });
    } else {
      this.reportService.createReport(this.report).subscribe(() => {
        this.loadReports();
        this.resetReportForm();
      });
    }
  }

  // Prepara il form per l'aggiornamento
  editReport(report: any): void {
    this.isEditing = true;
    this.report = { ...report }; // Copia i dati del report selezionato
  }

  // Elimina un report
  deleteReport(id: number): void {
    this.reportService.deleteReport(id).subscribe(() => {
      this.loadReports();
    });
  }

  // Annulla la modifica e resetta il form
  cancelReportEdit(): void {
    this.resetReportForm();
  }

  // Reset del form
  resetReportForm(): void {
    this.isEditing = false;
    this.report = { title: '', description: '', project_id: null };
  }

  /* REPORTS METHODS END*/

  goBack() {
    this.location.back();
  }
}
