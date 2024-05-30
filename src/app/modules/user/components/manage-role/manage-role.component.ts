import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, concatMap,  of,  } from 'rxjs';
import { RoleService } from '../../services/role.service';
import { IPermission, IRemoveRolePermission, IRole } from 'src/app/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { UpgradePermissionsComponent } from './upgrade-permissions/upgrade-permissions.component';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrl: './manage-role.component.css'
})
export class ManageRoleComponent implements OnInit,OnDestroy{

  isLoading = false
  roleId!:number
  roleData!:IRole
  previousRoute!:string

  //Substriptions
  routeParamSubsription!:Subscription
  constructor(
    private prevousRouteService:PreviousRouteService,
    private route:ActivatedRoute,
    private router:Router,
    private roleService:RoleService,
    private matDialog:MatDialog,
    private toastr:ToastrService


  ){}


  ngOnInit(): void {
    this.isLoading = true;
    console.log("Previous route: ",this.prevousRouteService.getPreviousUrl())
    if(this.prevousRouteService.getPreviousUrl()){
      this.previousRoute = this.prevousRouteService.getPreviousUrl()
    }
    
    this.routeParamSubsription = this.route.queryParams
    .pipe(
      concatMap((res:Params)=>{
        const id = res["id"]
        return of<number>(id)
      }),
      concatMap((id)=>{
        return this.roleService.GetRoleById(id)
      })
    )
    .subscribe({
      next: (res)=>{
        if(res.data){
          console.log(res)
          this.roleData = res.data
        }
        this.isLoading = false
      },
      error: (err)=>{
        this.isLoading = false
      }
    });
    
  }

  addPermission(){
    const dialogRef = this.matDialog.open(UpgradePermissionsComponent,{
      data:this.roleData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result from Upgrade Role: ${result}`);
      this.ngOnInit()
    });
  }

  goToPreviousRoute(){
    this.router.navigateByUrl(this.previousRoute)
  }

  removePermission(pData:IPermission){
    const tempRec: IRemoveRolePermission = {
      userRoleId: this.roleData.id,
      permissionId: pData.id
    }
    this.roleService.RemovePermissionFromRole(tempRec).subscribe({
      next: res => {
        if(res.success){
          this.toastr.success("Permission Removed Successfully")
          this.ngOnInit();
          
        }
      },
      error: err=>{
        this.toastr.warning("Permission Remove Fialed...")
      }
    })
  }

  ngOnDestroy(): void {
    this.routeParamSubsription.unsubscribe()
  }

}
