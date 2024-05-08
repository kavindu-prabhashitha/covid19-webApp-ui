import { ComponentFactoryResolver, Inject, Injectable, Injector, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { ModalComponent } from "./components/modal/modal.component";
import { DOCUMENT } from "@angular/common";
import { Subject } from "rxjs";

@Injectable()
export class ModalService{
    private modalNotifier?: Subject<string>;
    constructor(
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        @Inject(DOCUMENT) private document:Document
    ){
    }

    
    open(content: TemplateRef<any>, options?:{size?:string, title?:string}, component?:any){
        const modalComponentFactory = this.resolver.resolveComponentFactory(
            ModalComponent
          );
          const contentViewRef = content.createEmbeddedView(null);
          const modalComponent = modalComponentFactory.create(this.injector, [
            contentViewRef.rootNodes,
          ]);

       
        
        modalComponent.instance.size =  options?.size;
        modalComponent.instance.title = options?.title;

        modalComponent.instance.closeEvent.subscribe(()=>{
            this.closeModal()
        })

        modalComponent.instance.submitEvent.subscribe(()=>{
            this.submitModal()
        })

        modalComponent.hostView.detectChanges()
       
        //attach elements to the DOM 
        this.document.body.appendChild(modalComponent.location.nativeElement)

        this.modalNotifier = new Subject();
        return this.modalNotifier?.asObservable();
    }

    submitModal(){
        this.modalNotifier?.next('confim')
        this.closeModal()
    }

    closeModal(){
        
        this.modalNotifier?.complete()
    }
}