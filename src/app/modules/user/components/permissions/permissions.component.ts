import { Component, OnInit } from '@angular/core';
import { IPermission } from 'src/app/interfaces';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css'
})
export class PermissionsComponent implements OnInit{
 isLoading = false;
 permissions : IPermission[] = []

 constructor(private permissionService:PermissionService){

 }

  ngOnInit(): void {
    this.permissionService.GetPermissions().subscribe({
      next: (res)=>{
        this.permissions = res.data;
        console.log(res)
      }
    })
  }


}
