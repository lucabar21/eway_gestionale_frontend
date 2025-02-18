import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  isExpanded: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}
