import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../services/role.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ICreateRole } from 'src/app/interfaces';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrl: './add-edit-role.component.css'
})
export class AddEditRoleComponent {
  editMode = false;
  createRoleForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    uid: new FormControl(""),
  })

  constructor(
    private toastr:ToastrService,
    private roleService:RoleService,
    public dialogRef : MatDialogRef<AddEditRoleComponent>
  ){

  }

  onFormSubmit(){
    console.log(this.createRoleForm.value)
    if(this.createRoleForm.valid){
      const role:ICreateRole = {
        name : this.createRoleForm.value.name,
        uid: this.createRoleForm.value.uid
      }

      this.roleService.CreateRole(role).subscribe({
        next: (res)=>{
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

  resetForm(){
    this.createRoleForm.reset();
   }

   closeForm(): void{
    this.dialogRef.close()
   }
}
