import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILoginResponse, ILoginUser, IRegisterUser, IRevokeRefreshToken } from "../interfaces/Auth.interface";
import { BehaviorSubject, tap } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { User } from "../interfaces/User.interface";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserRole } from "../constants/UserRoles.enum";

export const API_PORT = 5169;
export const API_PROTOCOL = "http";


@Injectable()
export class AuthService{
    private readonly loginApiEndpoint = `${API_PROTOCOL}://localhost:${API_PORT}/Auth/Login`;
    private readonly registerUserApiEndpoint = `${API_PROTOCOL}://localhost:${API_PORT}/Auth/Register`
    private readonly refreshTokenEndpoint = `${API_PROTOCOL}://localhost:${API_PORT}/Auth/refresh-token`
    private readonly revokeRefreshTokenEndpoint = `${API_PROTOCOL}://localhost:${API_PORT}/Auth/revoke-refresh-token`

    isAuthenticated = new BehaviorSubject(false);
    constructor(
        private http:HttpClient, 
        private router:Router, 
        private userService:UserService,
        private jwtTokenService:JwtHelperService
    ){

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

                    const token = this.jwtTokenService.decodeToken()
                    console.log("Decoded Token : ",token)
                    const user: User =  {
                        userName : res.data.userName,
                        role: token.role
                    }
                    console.log("Current user : ",user)

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
            this.userService.setCurrentUser(user)
            return
        }

        this.isAuthenticated.next(false)

    }

    logout(){
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("accessToken");
        const user: User =  {
            userName : UserRole.ANONIMUS,
            role: UserRole.ANONIMUS
        }
        this.isAuthenticated.next(false);
        this.userService.setCurrentUser(user)
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