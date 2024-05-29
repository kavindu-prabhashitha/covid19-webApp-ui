import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { IRole } from 'src/app/interfaces/Roles.interface';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit{
  isLoading = false;
  roles:IRole[] = []

  constructor(
    private roleService:RoleService,
    private matDialog:MatDialog,
    private toastr:ToastrService,
    private router:Router
  ){

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.roleService.GetRoles().subscribe({
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

    dialogRef.afterClosed().subscribe(result => {
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

}
