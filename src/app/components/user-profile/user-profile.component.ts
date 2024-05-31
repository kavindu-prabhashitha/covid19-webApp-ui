import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/User.interface';
import { AccessPermissionService } from 'src/app/services/access-permission.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  currentUser!:IUser;
  
  constructor(private accessPermissionService:AccessPermissionService){

  }

  ngOnInit(): void {
 
      this.currentUser = this.accessPermissionService.getAuthenticatedUser()
    
  }

}
