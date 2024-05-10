import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILoginUser, IRegisterUser } from "../interfaces/Auth.interface";

@Injectable()
export class AuthService{
    private readonly loginApiEndpoint = "https://localhost:44332/Auth/Login";
    private readonly registerUserApiEndpoint = "https://localhost:44332/Auth/Register"

    constructor(private http:HttpClient){

    }

    login(data:ILoginUser){
        return this.http.post(this.loginApiEndpoint,data)
    }

    register(user:IRegisterUser){
        return this.http.post(this.registerUserApiEndpoint,user)
    }
}