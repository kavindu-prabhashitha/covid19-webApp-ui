import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/interfaces/User.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  currentUser!:User;
  userService = inject(UserService)

  ngOnInit(): void {
    if(this.userService.getCurrentUser().value){
      this.currentUser = this.userService.getCurrentUser().value
    }
  }

}
