import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { concatMap, tap } from 'rxjs';
import { ILoginUser } from 'src/app/interfaces/Auth.interface';

import { AccessPermissionService } from 'src/app/services/access-permission.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserNewService } from 'src/app/services/user-new.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   responseObject!:object
   currentUserId!:number

   loginForm:FormGroup = new FormGroup({
    username:new FormControl(''),
    password:new FormControl('',[Validators.required, Validators.minLength(5)])
   })

   constructor(
    private authService:AuthService,
    private userService:UserNewService, 
    private accessPermissionService:AccessPermissionService,
    private toaster:ToastrService,
    private router : Router
  ){

   }

   onLogin(){
    if(this.loginForm.invalid){
      this.toaster.warning("Check input Credentials")
      return
    }
    const user:ILoginUser = {
      username:this.loginForm.value.username,
      password:this.loginForm.value.password,
    }
    console.log("Login Data : ", user)
    this.authService.login(user).pipe(
      concatMap((res)=>{
          this.currentUserId = res.data.userId
          return this.userService.GetPermissionsByUserId(res.data.userId)
        }),
        tap((res)=>{
        this.accessPermissionService.setCurrentUserPermissions(res.data)
      }),
      concatMap((res)=>{
        return this.userService.GetUserById(this.currentUserId)
      }),
      tap((res)=>{
        console.log("Set Authenticated user")
        this.accessPermissionService.setAuthenticatedUser(res.data)
      })
    ).subscribe({
      next:res=>{
        console.log("Login response Data : ",res);
        this.responseObject = res;
        this.toaster.success("User Login Success");
        this.router.navigate(['/import-case'])
      },
      error: err=>{
        this.toaster.warning("User Login Failed !, Retry...");
      }
    })
   }

   getUsernameErrors(){
    if(this.loginForm.get("username")?.touched){
      if(this.loginForm.get("username")?.hasError('required')){
        return "Username field is required"
      }
    }
    return
   }

   getPasswordErrors(){
     if(this.loginForm.get("password")?.touched){
      if(this.loginForm.get("password")?.hasError('required')){
        return "Password field is required"
      }
      if(this.loginForm.get("password")?.hasError('minlength')){
        return "Password required minimum 5 characters"
      }
     }

     return 
   }


}
