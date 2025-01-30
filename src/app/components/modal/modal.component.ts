import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() header: string = '';
  @Input() elements: any[] = [];

  constructor(private router: Router) {}

  goToElement(id: number) {
    this.router.navigate(['/employee', id]);
  }
}
