import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-country-case',
  templateUrl: './add-edit-country-case.component.html',
  styleUrl: './add-edit-country-case.component.css'
})
export class AddEditCountryCaseComponent {

  @Input() size? = 'md';
  @Input() title? = 'Modal title';

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  countryCaseForm : FormGroup = new FormGroup({
    name: new FormControl(''),
    region:new FormControl(''),
    date: new FormControl(''),
    new: new FormControl(0),
    total: new FormControl(0)
  
   })

   constructor(private elementRef: ElementRef) {}

   close(): void {
     this.elementRef.nativeElement.remove();
     this.closeEvent.emit('closed');
   }
 
   submit(): void {
     this.elementRef.nativeElement.remove();
     this.submitEvent.emit();
   }
   onAddCountryFormSubmit(){
    console.log("form Data : ",this.countryCaseForm.value)
   }
  
}
