import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() navTitle = "";
  isDropdownOpen =false;

  toggleDropDown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
