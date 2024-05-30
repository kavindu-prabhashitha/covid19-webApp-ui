import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IPermission, IRole, IUpgradeRolePermission } from 'src/app/interfaces';
import { PermissionService } from '../../../services/permission.service';
import { Subscription, flatMap } from 'rxjs';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute } from '@angular/router';
import { PreviousRouteService } from 'src/app/services/previous-route.service';

@Component({
  selector: 'app-upgrade-permissions',
  templateUrl: './upgrade-permissions.component.html',
  styleUrl: './upgrade-permissions.component.css'
})
export class UpgradePermissionsComponent implements OnInit, OnDestroy{

  isLoading=false
  fromUrl!:string
  filteredPermissions: IPermission[]=[]
  selectedPermissions: IPermission[]=[]
  allSelecteNewPermissions: number[] = [];

  //Substriptions
  roleServiceSubstription!:Subscription;
  permissionServiceSubstription!:Subscription;

  constructor(
    private toastr:ToastrService,
    private permissionSerivce:PermissionService,
    private prevousRouteService:PreviousRouteService,
    private roleService:RoleService,
    @Inject(MAT_DIALOG_DATA) public data: IRole,
    public dialogRef : MatDialogRef<UpgradePermissionsComponent>
    ){ }

  ngOnInit(): void {
    this.isLoading=true;
    console.log("Previous route: ",this.prevousRouteService.getPreviousUrl())

    if(this.data){
      console.log("Recieved Data : ",this.data)
      this.permissionServiceSubstription = this.permissionSerivce.GetPermissions().subscribe({
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

  onPermissionChecked(pId:number){
    if (this.allSelecteNewPermissions.includes(pId)) {
      this.allSelecteNewPermissions = this.allSelecteNewPermissions.filter((item) => item !== pId);
    } else {
      this.allSelecteNewPermissions.push(pId);
    }
    console.log(this.allSelecteNewPermissions);
  }

  upgradeRolePermissions(){
    this.isLoading = true
    if(this.allSelecteNewPermissions.length !=0){
      const data: IUpgradeRolePermission = {
        userRoleId: this.data.id,
        permissionIds: this.allSelecteNewPermissions
      }
      this.roleServiceSubstription = this.roleService.UpgradeRolePermissions(data).subscribe({
        next: (res)=>{
          if(res.success){
            this.toastr.success("Role Permission Updated Successfully")
          }
          this.isLoading = false;
          this.closeForm()
        },
        error: (err)=>{
          this.toastr.warning("Something went Wrong");
          this.isLoading = false;
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.permissionServiceSubstription.unsubscribe();
    this.roleServiceSubstription.unsubscribe();
  }  

}
