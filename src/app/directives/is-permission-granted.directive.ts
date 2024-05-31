import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, inject } from "@angular/core";
import { AccessPermissionService } from "../services/access-permission.service";

@Directive({
    selector:'[isPermissionGranted]',
})
export class IsPermissionGrantedDirective implements OnInit{
    private _accessPermissionService = inject(AccessPermissionService);
    private _templateRef = inject(TemplateRef);
    private _viewContainer = inject(ViewContainerRef);
    private _roleOrPermission!: number;

    @Input()
    set isPermissionGranted(roleOrPermission: number) {
      this._roleOrPermission = roleOrPermission;
    }
  

    ngOnInit(): void {
        if(this._accessPermissionService.isPermissionGranted(this._roleOrPermission)){
            this._viewContainer.clear();
            this._viewContainer.createEmbeddedView(this._templateRef);
        }
    }

}