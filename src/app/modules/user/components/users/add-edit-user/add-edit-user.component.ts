import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from 'src/app/constants/UserRoles.enum';
import { IRegisterUser } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css'
})
export class AddEditUserComponent {

  userCreationForm:FormGroup = new FormGroup({
    username:new FormControl(''),
    password:new FormControl(''),
    role:new FormControl('USER')
   })
   constructor(
    private toastr:ToastrService,
    private authService:AuthService
   ){

   }

  onCreateUser(){
    if(this.userCreationForm.invalid){
      this.toastr.warning("Check input Credentials")
      return
    }
    const user:IRegisterUser = {
      username:this.userCreationForm.value.username,
      password:this.userCreationForm.value.password,
      role:this.userCreationForm.value.role
    }
    console.log("Register User Data : ", user)
    // this.authService.register(user).subscribe({
    //   next:res=>{
    //     console.log(res);
    //     this.toaster.success("User Register Success");
    //   },
    //   error: err=>{
    //     this.toaster.warning("User Register Failed !, Retry...");
    //   }
    // })

    if(user.role){
      if(user.role === UserRole.ADMINISTRATOR){
        this.registerAdminUser(user)
        return
      }

      if(user.role === UserRole.USER){
        this.registerUser(user)
        return
      }
    }

    this.toastr.warning("Something Went Wrong. Try Again...")

  }

  registerUser(userData:IRegisterUser){
    this.authService.register(userData).subscribe({
      next:res=>{
        console.log(res);
        this.toastr.success("User Register Success");
      },
      error: err=>{
        this.toastr.warning("User Register Failed !, Retry...");
      }
    })
   }

   registerAdminUser(adminUser:IRegisterUser){
      this.authService.registerAdmin(adminUser).subscribe({
      next:res=>{
        console.log(res);
        this.toastr.success("Admin User Register Success");
      },
      error: err=>{
        this.toastr.warning("Admin User Register Failed !, Retry...");
      }
    })
   }

}
