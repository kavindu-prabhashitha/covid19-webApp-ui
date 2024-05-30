import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IRole, IUpgradeUserRole, IUser } from 'src/app/interfaces';
import { RoleService } from '../../../services/role.service';
import { UserService } from 'src/app/services/user.service';
import { UserNewService } from '../../../services/user-new.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit{


  isLoading=false
  currentUser!:IUser
  roles:IRole[]=[]

  userManageForm:FormGroup = new FormGroup({
    roleId: new FormControl("")
  })

  constructor(
    private toastr:ToastrService,
    private roleService:RoleService,
    private userService:UserNewService,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    public dialogRef : MatDialogRef<ManageUsersComponent>
  ){

  }

  ngOnInit(): void {
    this.isLoading = true;
    if(this.data){
      this.currentUser = this.data
    }
    this.roleService.GetRoles().subscribe({
      next: (res)=>{
        console.log("System Roles",res.data)
        if(res){
          this.roles = res.data
        }
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  onFormSubmit(){
    const currentRoleId = this.currentUser.role.id
    const userId = this.currentUser.id
    const selectedRoleId = this.userManageForm.value.roleId
    if(selectedRoleId === ""){
      this.toastr.info("Please Select Role Before Upgrade")
      return
    }

    const upgradedRoleId = Number(selectedRoleId)


    if(this.userManageForm.valid){
      if(currentRoleId !== upgradedRoleId){
        const updateData:IUpgradeUserRole = {
          userId: userId,
          roleId:upgradedRoleId
        }
        this.upgradeUserRole(updateData)
        return
      }
      this.toastr.info("Please Select Diffrent Role to Upgrade")
    }
  }

  upgradeUserRole(data:IUpgradeUserRole){
    console.log("User Role Upgraded...")
    this.userService.UpgradeUserRole(data).subscribe({
      next:(res)=>{
        console.log("user Role Upgrade Failed ",res)
        this.toastr.success("User Role Upgraded Successfully")
        this.closeForm()
      },
      error: (err)=>{
        this.toastr.warning("User Role Upgrade Failed")
        this.closeForm()
      }
    },
  )
  }

  closeForm(){
    this.dialogRef.close()
  }
}
