import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  constructor(private router:Router){

  }

  navigateToRoles(){
    this.router.navigateByUrl("/user-module/roles")
  }

  navigateToPermissions(){
    this.router.navigateByUrl("/user-module/permissions")
  }
}
