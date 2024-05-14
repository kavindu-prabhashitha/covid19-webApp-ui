import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Input() navTitle = "";
  isDropdownOpen =false;
  isAuthenticated=false;

  constructor(private router:Router, private authService:AuthService){

  }
  ngOnInit(): void {
    console.log("onInit NavBar.....")
  }

  toggleDropDown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onLoginBtnClicked(){
    this.router.navigateByUrl("login")
  }

  onLogoutBtnClicked(){
    this.authService.logout();

  }
  
  onRegisterBtnClicked(){
    this.router.navigateByUrl("register")
  }
}
