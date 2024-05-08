import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Toast, ToastrService } from 'ngx-toastr';
import { IAddCountryCaseData, IUpdateCountryCaseData } from 'src/app/interfaces';
import { Covid19APIService } from 'src/app/services/covid19API.service';

@Component({
  selector: 'app-add-edit-country-case',
  templateUrl: './add-edit-country-case.component.html',
  styleUrl: './add-edit-country-case.component.css'
})
export class AddEditCountryCaseComponent implements OnInit{

  @Input() size? = 'md';
  @Input() title? = 'Modal title';
  @Input() countryCaseData!:IUpdateCountryCaseData

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  countryCaseForm : FormGroup = new FormGroup({
    country: new FormControl(''),
    region:new FormControl(''),
    date: new FormControl(''),
    new: new FormControl(0),
    total: new FormControl(0)
  
   })

   editMode = false;

   constructor(
    private elementRef: ElementRef, 
    private apiService:Covid19APIService, 
    private toasterService:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: IUpdateCountryCaseData
  ) {}

   ngOnInit(){
      if(this.data){
        this.countryCaseForm.patchValue({
            country: this.data.country,
            region:this.data.region,
            date: this.data.case.date,
            new: this.data.case.new,
            total: this.data.case.total

        })
        this.editMode = true
        console.log("Data from Mat Dialog : ",this.data)
      }
   }

   close(): void {
     this.elementRef.nativeElement.remove();
     this.closeEvent.emit('closed');
   }
 
   submit(): void {
     this.elementRef.nativeElement.remove();
     this.submitEvent.emit();
   }


   resetForm(){
    this.countryCaseForm.reset();
   }

   onAddCountryFormSubmit(){
    console.log("form Data : ",this.countryCaseForm.value);

    if(this.countryCaseForm.invalid){
      this.toasterService.warning("Invalid Form Entries, Check Again")
      return
    }
    const caseData:IAddCountryCaseData = {
      country:this.countryCaseForm.value.country,
      region:this.countryCaseForm.value.region,
      case:{
        date:this.countryCaseForm.value.date,
        new: Number(this.countryCaseForm.value.new),
        total:Number(this.countryCaseForm.value.total)
      }
    }
    this.apiService.addCountryCaseData(caseData).subscribe({
      next: res=>{
        if(res.success){
          this.toasterService.success("Country Case Data Addedd Successfully")
          this.countryCaseForm.reset()
        }
        console.log(res)
      },
      error: error=>{
        console.log(error)
      }
    })
   }
  
}
