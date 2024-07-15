/*

import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, inject } from "@angular/core";
import { UserService } from "../services/user.service-sample";

@Directive({
    selector:'[isGranted]'
})
export class IsGrantedDirective implements OnInit{
    private _userService = inject(UserService);
    private _templateRef = inject(TemplateRef);
    private _viewContainer = inject(ViewContainerRef);
    private _roleOrPermission!: string;

    @Input()
    set isGranted(roleOrPermission: string) {
      this._roleOrPermission = roleOrPermission;
    }
  

    ngOnInit(): void {
        if(this._userService.isGranted(this._roleOrPermission)){
            this._viewContainer.clear();
            this._viewContainer.createEmbeddedView(this._templateRef);
        }
    }

}

*/