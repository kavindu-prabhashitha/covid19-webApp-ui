import { Directive, OnInit } from "@angular/core";

@Directive({
    selector:'[isGranted]'
})
export class IsGrantedDirective implements OnInit{
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}