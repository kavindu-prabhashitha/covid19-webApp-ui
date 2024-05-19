import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject} from "@angular/core"
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const toaster:ToastrService = inject(ToastrService)
  const protectedRoutes:string[]=["/import-case","/profile"]

  const accessToken = localStorage.getItem("accessToken")

  const isInvalid = protectedRoutes.includes(state.url) && !accessToken

  if(isInvalid){
    toaster.warning("Unauthorized ! . Login to continue")
  }

  return isInvalid ? router.navigate(["/login"]) : true
};
