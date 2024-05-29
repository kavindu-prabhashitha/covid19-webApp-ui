import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../../../services/permission.service';
import { ICreatePermission } from 'src/app/interfaces';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-permission',
  templateUrl: './add-edit-permission.component.html',
  styleUrl: './add-edit-permission.component.css'
})
export class AddEditPermissionComponent {
  editMode = false;
  permissionForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    rPid: new FormControl(""),
    description:new FormControl("")
  })

  constructor(
    private toastr:ToastrService,
    private permissionService:PermissionService,
    public dialogRef : MatDialogRef<AddEditPermissionComponent>
  ){

  }

  onFormSubmit(){
    console.log(this.permissionForm.value)
    if(this.permissionForm.valid){
      const permission:ICreatePermission = {
        name : this.permissionForm.value.name,
        rPid: this.permissionForm.value.rPid,
        description: this.permissionForm.value.description
      }

      this.permissionService.CreatePermission(permission).subscribe({
        next: (res)=>{
          if(res.success){
            this.toastr.success("Permission Created Success")
            console.log(res)
            this.closeForm()
          }
        },
        error: (err)=>{
          this.toastr.warning("Pemission Creation Failed...")
        }
      })
  }
}

  resetForm(){
    this.permissionForm.reset();
   }

   closeForm(): void{
    this.dialogRef.close()
   }

}
