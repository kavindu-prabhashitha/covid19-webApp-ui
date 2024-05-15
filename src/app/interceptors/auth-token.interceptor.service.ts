import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, exhaustMap, of, take, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { IRevokeRefreshToken } from "../interfaces/Auth.interface";


@Injectable()
export class AuthTokenInterceptorService implements HttpInterceptor{
    constructor(
        private inject:Injector){

    }

    ctr=0;

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let accessToken = localStorage.getItem("accessToken")
        if(accessToken){
            let modifiedRequest = req.clone({
                setHeaders:{
                    Authorization:`bearer ${accessToken}`
                }
            })
        return next.handle(modifiedRequest).pipe(
            catchError(x => this.handleAuthError(x))
        )
        }
        
        return next.handle(req).pipe(
            catchError(x => this.handleAuthError(x))
        )
       
    }

    private handleAuthError(err:HttpErrorResponse): Observable<any>{
        let service = this.inject.get(AuthService);
        let routerService = this.inject.get(Router)
        if(err && err.status === 401 && this.ctr!=1){
            this.ctr++
            service.refreshToken().subscribe({
                next: (x:any)=>{
                    console.log("refresh tokens : ",x)
                    if(x.data){
                        localStorage.setItem("accessToken",x.data.accessToken)
                        localStorage.setItem("refreshToken",x.data.refreshToken)
                    }
                    console.log("Token Refreshed......")
                    return of("token refreshed")
                },
                error: (err:any)=>{
                    let refreshToken = localStorage.getItem("refreshToken") ?? ""
                    let userName = localStorage.getItem("userName") ?? ""

                    const obj:IRevokeRefreshToken = {
                        userName: userName,
                        refreshToken: refreshToken
                    }
                    service.revokeToken(obj).subscribe({
                        next: res=>{
                            service.clearLocalStorage()
                            console.log("Token Revoked......")
                            routerService.navigateByUrl("/login");
                        }
                    });
                    
                    return of(err.message)
                }
            });
            return of("Attempting to Refresh Tokens")
        }else{
            this.ctr = 0;
            routerService.navigate(['/login'])
            return throwError(()=>new Error("Non Authentication Error"));
        }
    }

}