import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title: string = '';
  @Input() elements: any[] = [];
  @Input() icon: string = '';
  @Input() link: string = '';

  constructor(private router: Router) {}

  getLastTwoItems() {
    return this.elements.slice(-2);
  }

  goToElement(id: number) {
    this.router.navigate(['/', this.link, id]);
  }
}
