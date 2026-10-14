import {
  Component,
  HostListener
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  mobileMenu = false;

  scrolled = false;

  toggleMenu() {

    this.mobileMenu = !this.mobileMenu;

  }

  @HostListener('window:scroll')

  onScroll() {

    this.scrolled = window.scrollY > 40;

  }

}