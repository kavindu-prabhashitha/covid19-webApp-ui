import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../services/role.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICreateRole, IRole, IUpdateRole } from 'src/app/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrl: './add-edit-role.component.css'
})
export class AddEditRoleComponent implements OnInit,OnDestroy{
  editMode = false;
  createRoleForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    uid: new FormControl(""),
    description: new FormControl("")
  })

  //Substriptons
  roleServiceSub!:Subscription

  constructor(
    private toastr:ToastrService,
    private roleService:RoleService,
    public dialogRef : MatDialogRef<AddEditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUpdateRole,
  ){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.data){
      this.editMode = true
      this.createRoleForm.patchValue({
        name: this.data.name,
        uid: this.data.uid,
        description: this.data.description
      })
      this.createRoleForm.controls['uid'].disable();

    }
    
  }

  onFormSubmit(){
    console.log(this.createRoleForm.value)
    if(this.createRoleForm.valid){
      //Role Update
      if(this.editMode){
        const updateRec:IUpdateRole = {
          id: this.data.id,
          name : this.createRoleForm.value.name,
          //uid: this.createRoleForm.value.uid,
          description: this.createRoleForm.value.description
        }
        this.updateRole(updateRec)
        return
      }


      //Role Creation
      const role:ICreateRole = {
        name : this.createRoleForm.value.name,
        uid: this.createRoleForm.value.uid
      }
 
      this.roleServiceSub = this.roleService.CreateRole(role).subscribe({
        next: (res)=>{
          console.log(res)
          if(res.success){
            this.toastr.success("Role Created Success")
            console.log(res)
            this.closeForm()
          }
        },
        error: (err)=>{
          this.toastr.warning("Role Creation Failed...")
        }
      })
    }
   
  }

  updateRole(data:IUpdateRole){
    this.roleServiceSub = this.roleService.UpdateRole(data).subscribe({
      next: (res)=>{
        if(res.success){
          this.toastr.success("Role Updated Success")
          console.log(res)
          this.closeForm()
        }
      },
      error: (err)=>{
        this.toastr.warning("Role Update Failed...")
      }
    })
  }

  resetForm(){
    this.createRoleForm.reset();
   }

   closeForm(): void{
    this.dialogRef.close()
   }

   ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.roleServiceSub) {this.roleServiceSub.unsubscribe()}
   }
}
