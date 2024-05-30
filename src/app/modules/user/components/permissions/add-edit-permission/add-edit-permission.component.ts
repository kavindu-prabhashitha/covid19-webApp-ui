import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../../../services/permission.service';
import { ICreatePermission, IPermission, IUpdatePermission } from 'src/app/interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-permission',
  templateUrl: './add-edit-permission.component.html',
  styleUrl: './add-edit-permission.component.css'
})
export class AddEditPermissionComponent implements OnInit{
  editMode = false;
  permissionForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    rPid: new FormControl(""),
    description:new FormControl("")
  })

  //Substriptions
  permissionServiceSub!:Subscription

  constructor(
    private toastr:ToastrService,
    private permissionService:PermissionService,
    public dialogRef : MatDialogRef<AddEditPermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPermission,
  ){}

  ngOnInit(): void {
    if(this.data){
      this.editMode = true
      this.permissionForm.patchValue({
        name : this.data.name,
        rPid: this.data.rPid,
        description: this.data.description
      })
      this.permissionForm.controls['rPid'].disable();
    }
  }

  onFormSubmit(){
    console.log(this.permissionForm.value)
    if(this.permissionForm.valid){
      
      if(this.editMode){
        //Update Record and return
        const updatePr :IUpdatePermission = {
        id:this.data.id,
        name : this.permissionForm.value.name,
        //rPid: this.permissionForm.value.rPid,
        description: this.permissionForm.value.description
        }
        this.updatePermission(updatePr)
        return
      }
      const permission:ICreatePermission = {
        name : this.permissionForm.value.name,
        rPid: this.permissionForm.value.rPid,
        description: this.permissionForm.value.description
      }

      this.permissionServiceSub = this.permissionService.CreatePermission(permission).subscribe({
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

updatePermission(data:IUpdatePermission){
  this.permissionServiceSub = this.permissionService.UpdatePermission(data).subscribe({
    next:(res)=>{
      if(res.success){
        this.toastr.success("Permission Updated Succesfully")
        this.closeForm()
      }
    },
    error: (err)=>{
      this.toastr.warning("Something Went Wrong")
    }
  })
}


  resetForm(){
    this.permissionForm.reset();
   }

   closeForm(): void{
    this.dialogRef.close()
   }

   ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.permissionServiceSub){
      this.permissionServiceSub.unsubscribe()
    }
    
   }

}
