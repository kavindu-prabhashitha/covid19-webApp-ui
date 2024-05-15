import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    password:new FormControl('')
   })

   constructor(private authService:AuthService, private toaster:ToastrService){

   }

   onLogin(){
    if(this.registerForm.invalid){
      this.toaster.warning("Check input Credentials")
      return
    }
    const user:IRegisterUser = {
      username:this.registerForm.value.username,
      password:this.registerForm.value.password,
    }
    console.log("Register Data : ", user)
    this.authService.register(user).subscribe({
      next:res=>{
        console.log(res);
        this.toaster.success("User Register Success");
      },
      error: err=>{
        this.toaster.warning("User Register Failed !, Retry...");
      }
    })
   }
}
