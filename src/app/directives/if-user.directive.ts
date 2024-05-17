import { NgIf } from "@angular/common";
import { Directive, OnInit, inject } from "@angular/core";
import { DestroyedDirective } from "./destroyed.directive";
import { UserService } from "../services/user.service";
import { takeUntil } from "rxjs";
import { UserRole } from "../constants/UserRoles.enum";

@Directive({
    selector:'[ifUser]',
    hostDirectives: [NgIf,DestroyedDirective]
})
export class IfUser implements OnInit{
    private readonly ngIfDirective = inject(NgIf);
    private readonly destroyed$ = inject(DestroyedDirective).destroyed$;

    constructor(private readonly userService: UserService) {

    }

    // ngOnInit(): void {
    //     this.userService.isUser$
    // .pipe(takeUntil(this.destroyed$))
    // .subscribe((isUser) => {
    //     console.log(`If User Directive --> ${isUser}`)
    //   this.ngIfDirective.ngIf = isUser;
    // });
    // }

    ngOnInit(): void {
    this.userService.getCurrentUserV2()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((currentUser) => {
      this.ngIfDirective.ngIf = currentUser.role ===UserRole.USER ? true : false;
    });
    }

}