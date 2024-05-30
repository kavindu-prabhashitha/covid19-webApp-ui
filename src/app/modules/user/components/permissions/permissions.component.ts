import { Component, OnInit } from '@angular/core';
import { IPermission } from 'src/app/interfaces';
import { PermissionService } from '../../services/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditPermissionComponent } from './add-edit-permission/add-edit-permission.component';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent implements OnInit{
 isLoading = false;
 permissions : IPermission[] = []

 constructor(
  private permissionService:PermissionService,
  private matDialog:MatDialog
  ){

 }

  ngOnInit(): void {
    this.isLoading = true;
    this.permissionService.GetPermissions().subscribe({
      next: (res)=>{
        this.permissions = res.data;
        console.log(res)
        this.isLoading = false
      },
      error : (err)=>{

      }
    })
  }

  createPermission(){
    const dialogRef = this.matDialog.open(AddEditPermissionComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result from Add Country Case: ${result}`);
      this.ngOnInit()
    });

  }

  editPermission(data:IPermission){
    const dialogRef = this.matDialog.open(AddEditPermissionComponent, {
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result from Add Country Case: ${result}`);
      this.ngOnInit()
    });
  }


}
