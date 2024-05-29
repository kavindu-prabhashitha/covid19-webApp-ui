import { Component, Inject, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IPermission, IRole } from 'src/app/interfaces';
import { PermissionService } from '../../../services/permission.service';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-upgrade-permissions',
  templateUrl: './upgrade-permissions.component.html',
  styleUrl: './upgrade-permissions.component.css'
})
export class UpgradePermissionsComponent implements OnInit{

  isLoading=false
  filteredPermissions: IPermission[]=[]
  selectedPermissions: IPermission[]=[]


  constructor(
    private toastr:ToastrService,
    private permissionSerivce:PermissionService,
    @Inject(MAT_DIALOG_DATA) public data: IRole,
    public dialogRef : MatDialogRef<UpgradePermissionsComponent>
    ){ }

  ngOnInit(): void {
    this.isLoading=true;
    if(this.data){
      console.log("Recieved Data : ",this.data)
      this.permissionSerivce.GetPermissions().subscribe({
        next: (res)=>{
          const currentPrIds:number[] = []
          this.data.rolePermissions?.forEach(pr=>{
            currentPrIds.push(pr.id)
          })
          console.log("Permissions recieved : ",res.data)

          res.data.forEach(pr=>{
            if(!currentPrIds.includes(pr.id)){
              this.filteredPermissions.push(pr)
            }
          })
          this.isLoading = false
        },
        error: (err)=>{
          this.isLoading = false
        }
      })
    }
  }

  closeForm(){
    this.dialogRef.close()
  }

  

}
