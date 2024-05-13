import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    password:new FormControl('')
   })

   constructor(private authService:AuthService, private toaster:ToastrService){

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
      },
      error: err=>{
        this.toaster.warning("User Login Failed !, Retry...");
      }
    })
   }
}
