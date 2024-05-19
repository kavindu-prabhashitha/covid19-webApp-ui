import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from 'src/app/constants/UserRoles.enum';
import { IRegisterUser } from 'src/app/interfaces/Auth.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm:FormGroup = new FormGroup({
    username:new FormControl(''),
    password:new FormControl(''),
    role:new FormControl('USER')
   })

   constructor(
    private authService:AuthService, 
    private toaster:ToastrService){

   }

   onUserRegister(){
    if(this.registerForm.invalid){
      this.toaster.warning("Check input Credentials")
      return
    }
    const user:IRegisterUser = {
      username:this.registerForm.value.username,
      password:this.registerForm.value.password,
      role:this.registerForm.value.role
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

    this.toaster.warning("Something Went Wrong. Try Again...")

   }

   registerUser(userData:IRegisterUser){
    this.authService.register(userData).subscribe({
      next:res=>{
        console.log(res);
        this.toaster.success("User Register Success");
      },
      error: err=>{
        this.toaster.warning("User Register Failed !, Retry...");
      }
    })
   }

   registerAdminUser(adminUser:IRegisterUser){
      this.authService.registerAdmin(adminUser).subscribe({
      next:res=>{
        console.log(res);
        this.toaster.success("Admin User Register Success");
      },
      error: err=>{
        this.toaster.warning("Admin User Register Failed !, Retry...");
      }
    })
   }
}
