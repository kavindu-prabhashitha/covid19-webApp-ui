import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { IRole } from 'src/app/interfaces/Roles.interface';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit{
  isLoading = false;
  roles:IRole[] = [];

  //Substriptions
  roleServiceSub!:Subscription;
  dialogSub!:Subscription;

  constructor(
    private roleService:RoleService,
    private matDialog:MatDialog,
    private toastr:ToastrService,
    private router:Router
  ){

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.roleServiceSub = this.roleService.GetRoles().subscribe({
      next: (res)=>{
        this.roles = res.data
        console.log(res)
        this.isLoading = false
      },
      error: (err)=>{
        this.toastr.warning("Something Went wrong...")
        this.isLoading = false
      }
    })
  }

  createRole(){
    const dialogRef = this.matDialog.open(AddEditRoleComponent);

    this. dialogSub = dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result from Add Edit Role: ${result}`);
      this.ngOnInit()
    });

  }

  manageRole(id:number){
    this.router.navigate(
      ['user-module/manage-role'],
      {queryParams: {id}}
    )
  }

  editRole(role:IRole){
    const dialogRef = this.matDialog.open(AddEditRoleComponent,{
      data:role
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result from Add Edit Role: ${result}`);
      this.ngOnInit()
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.roleServiceSub) this.roleServiceSub.unsubscribe();
    if(this.dialogSub) this.dialogSub.unsubscribe();
    
  }

}
