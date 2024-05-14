import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILoginResponse, ILoginUser, IRegisterUser } from "../interfaces/Auth.interface";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";


@Injectable()
export class AuthService{
    private readonly loginApiEndpoint = "https://localhost:44332/Auth/Login";
    private readonly registerUserApiEndpoint = "https://localhost:44332/Auth/Register"
    private readonly refreshTokenEndpoint = "https://localhost:44332/Auth/refresh-token"
    constructor(private http:HttpClient, private router:Router){

    }

    login(data:ILoginUser){
        return this.http.post<ILoginResponse>(this.loginApiEndpoint,data).pipe(
            tap(res=>{
                console.log(res);
                if(res.data){
                    localStorage.setItem("accessToken",res.data.accessToken)
                    localStorage.setItem("refreshToken",res.data.refreshToken)
                }
                
            })
          )
    }

    // autoLogin(){
    //     let userData :{token:string, refreshToken:string} = JSON.parse(localStorage.getItem("userData") ?? "{}");
    //     if(!userData){
    //         return
    //     }
    // }

    logout(){
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        this.router.navigate(['/login'])
    }

    register(user:IRegisterUser){
        return this.http.post(this.registerUserApiEndpoint,user)
    }

    refreshToken(){
        let accessToken = localStorage.getItem("accessToken")
        let refreshToken = localStorage.getItem("refreshToken")
        if(accessToken && refreshToken){
            
            return this.http.post(this.refreshTokenEndpoint,{
                accessToken:accessToken,
                refreshToken: refreshToken
            })
        }

        return this.http.post(this.registerUserApiEndpoint,{})
    }

    revokeToken(){
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
    }


}