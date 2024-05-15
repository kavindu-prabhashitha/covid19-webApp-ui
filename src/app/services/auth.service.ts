import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILoginResponse, ILoginUser, IRegisterUser, IRevokeRefreshToken } from "../interfaces/Auth.interface";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";


@Injectable()
export class AuthService{
    private readonly loginApiEndpoint = "https://localhost:44332/Auth/Login";
    private readonly registerUserApiEndpoint = "https://localhost:44332/Auth/Register"
    private readonly refreshTokenEndpoint = "https://localhost:44332/Auth/refresh-token"
    private readonly revokeRefreshTokenEndpoint = "https://localhost:44332/Auth/revoke-refresh-token"

    isAuthenticated = new BehaviorSubject(false);
    constructor(private http:HttpClient, private router:Router){

    }

    login(data:ILoginUser){
        return this.http.post<ILoginResponse>(this.loginApiEndpoint,data).pipe(
            tap(res=>{
                console.log(res);
                if(res.data){
                    localStorage.setItem("accessToken",res.data.accessToken)
                    localStorage.setItem("refreshToken",res.data.refreshToken)
                    localStorage.setItem("userName",res.data.userName)
                    this.isAuthenticated.next(true)
                }
                
            })
          )
    }

    autoLogin(){
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if(accessToken && refreshToken){
            this.isAuthenticated.next(true)
            return
        }

        this.isAuthenticated.next(false)

    }

    logout(){
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken")
        this.isAuthenticated.next(false)
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

    revokeToken(data:IRevokeRefreshToken){
        return this.http.post(this.revokeRefreshTokenEndpoint,data)
    }

    clearLocalStorage(){
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
    }


}