import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { UserNewService } from '../../../../services/user-new.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { Subscription } from 'rxjs';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  isLoading = false;
  users: IUser[]=[]

  //Substriptions
  dialogSub!:Subscription;

  constructor(
    private userService:UserNewService,
    private matDialog: MatDialog
  ){

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.GetAllUsers().subscribe({
      next: (res)=>{
        console.log("All Users : ",res)
        if(res.success){
          this.users = res.data
        }
        this.isLoading = false
      },
      error: (err)=>{
        this.isLoading = false
        console.log(err)
      }
    })
  }



  createUser(){
    const dialogRef = this.matDialog.open(AddEditUserComponent);

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result from Add Edit User: ${result}`);
      this.ngOnInit()
    });
  }

  manageUser(user : IUser){
    const dialogRef = this.matDialog.open(ManageUsersComponent,{
      data:user
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result from Add Edit User: ${result}`);
      this.ngOnInit()
    });
  }

  editUser(user : IUser){

  }
}
