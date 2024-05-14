import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, exhaustMap, of, take, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()
export class AuthTokenInterceptorService implements HttpInterceptor{
    constructor(
        private router:Router,
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
        
        return next.handle(req)
       
    }

    private handleAuthError(err:HttpErrorResponse): Observable<any>{
        if(err && err.status === 401 && this.ctr!=1){
            this.ctr++
            let service = this.inject.get(AuthService);
            service.refreshToken().subscribe({
                next: (x:any)=>{
                    console.log("refresh tokens : ",x)
                    if(x.data){
                        localStorage.setItem("accessToken",x.data.accessToken)
                        localStorage.setItem("refreshToken",x.data.refreshToken)
                    }
                    return of("token refreshed")
                },
                error: (err:any)=>{
                    service.revokeToken();
                    this.router.navigateByUrl("/login");
                    return of(err.message)
                }
            });
            return of("Attempting to Refresh Tokens")
        }else{
            this.ctr = 0;
            return throwError(()=>new Error("Non Authentication Error"));
        }
    }

}