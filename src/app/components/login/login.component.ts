import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ILoginUser } from 'src/app/interfaces/Auth.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   responseObject!:object

   loginForm:FormGroup = new FormGroup({
    username:new FormControl(''),
    password:new FormControl('',[Validators.required, Validators.minLength(5)])
   })

   constructor(
    private authService:AuthService, 
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
    this.authService.login(user).subscribe({
      next:res=>{
        console.log(res);
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