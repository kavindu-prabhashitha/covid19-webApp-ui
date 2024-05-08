import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './modal.service';



@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule],
  providers:[ModalService]
})
export class ModalModule { }
