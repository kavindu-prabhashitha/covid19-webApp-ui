import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILoginResponse, ILoginUser, IRegisterUser, IRevokeRefreshToken } from "../interfaces/Auth.interface";
import { BehaviorSubject, tap } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../interfaces/User.interface";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserRole } from "../constants/UserRoles.enum";
import { API_LOGIN_USER, API_REFRESH_TOKEN, API_REGISTER_ADMIN, API_REGISTER_USER, API_REVOKE_REFRESH_TOKEN } from "../constants";
import { AccessPermissionService } from "./access-permission.service";

export const API_PORT = 44332;
export const API_PROTOCOL = "https";


@Injectable()
export class AuthService{

    isAuthenticated = new BehaviorSubject(false);
    constructor(
        private http:HttpClient, 
        private router:Router, 
        private accessPermissionService:AccessPermissionService,
        private jwtTokenService:JwtHelperService
    ){

    }

    login(data:ILoginUser){
        return this.http.post<ILoginResponse>(API_LOGIN_USER,data).pipe(
            tap(res=>{
                console.log(res);
                if(res.data){
                    localStorage.setItem("accessToken",res.data.accessToken)
                    localStorage.setItem("refreshToken",res.data.refreshToken)
                    localStorage.setItem("userName",res.data.userName)
                    this.isAuthenticated.next(true)

                    const token = this.jwtTokenService.decodeToken()
                    console.log("Decoded Token : ",token)
                    const user: User =  {
                        userName : res.data.userName,
                        role: token.role
                    }
                   

                }
                
            })
          )
    }

    autoLogin(){
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if(accessToken && refreshToken){
            this.isAuthenticated.next(true)
            const token = this.jwtTokenService.decodeToken()
                    console.log("Decoded Token : ",token)
                    const user: User =  {
                        userName : token.unique_name,
                        role: token.role
                    }
                    console.log("Current user Auto Login : ",user, "role : ",typeof user.role)
            return
        }

        this.isAuthenticated.next(false)

    }

    logout(){
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        const user: User =  {
            userName : UserRole.ANONYMOUS,
            role: UserRole.ANONYMOUS
        }
        this.isAuthenticated.next(false);
        this.accessPermissionService.removeCurrentUserPermissions()
        this.router.navigate(['/login'])
        
    }

    register(user:IRegisterUser){
        return this.http.post(API_REGISTER_USER,user)
    }

    registerAdmin(adminUser:IRegisterUser){
        return this.http.post(API_REGISTER_ADMIN,adminUser)
    }

    refreshToken(){
        let accessToken = localStorage.getItem("accessToken")
        let refreshToken = localStorage.getItem("refreshToken")
        if(accessToken && refreshToken){
            
            return this.http.post(API_REFRESH_TOKEN,{
                accessToken:accessToken,
                refreshToken: refreshToken
            })
        }

        return this.http.post(API_REGISTER_USER,{})
    }

    revokeToken(data:IRevokeRefreshToken){
        return this.http.post(API_REVOKE_REFRESH_TOKEN,data)
    }

    clearLocalStorage(){
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
    }


}