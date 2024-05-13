import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() navTitle = "";
  isDropdownOpen =false;

  constructor(private router:Router){

  }

  toggleDropDown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLoginBtnClicked(){
    this.router.navigateByUrl("login")
  }
  
  onRegisterBtnClicked(){
    this.router.navigateByUrl("register")
  }
}
