import { NgIf } from "@angular/common";
import { Directive, OnInit, inject } from "@angular/core";
import { DestroyedDirective } from "./destroyed.directive";
import { UserService } from "../services/user.service";
import { takeUntil } from "rxjs";
import { UserRole } from "../constants/UserRoles.enum";

@Directive({
    selector:'[ifAdminUser]',
    hostDirectives: [NgIf,DestroyedDirective]
})
export class IfAdminUser implements OnInit{
    private readonly ngIfDirective = inject(NgIf);
    private readonly destroyed$ = inject(DestroyedDirective).destroyed$;

    constructor(private readonly userService: UserService) {}

    // ngOnInit(): void {
    //     this.userService.isAdmin$
    // .pipe(takeUntil(this.destroyed$))
    // .subscribe((isAdmin) => {
    //   console.log(`If Admin Directive --> ${isAdmin}`)
    //   this.ngIfDirective.ngIf = !isAdmin;
    // });
    // }

    ngOnInit(): void {
        this.userService.getCurrentUserV2()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((currentUser) => {
      this.ngIfDirective.ngIf = currentUser.role ===UserRole.ADMINISTRATOR ? true : false;;
    });
    }

}