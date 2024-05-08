import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Covid19APIService } from './services/covid19API.service';
import { KeysPipe } from './pipes/key.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchCasesComponent } from './components/search-cases/search-cases.component';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from './shared/modules/modal/modal.module';
import { AddEditCountryCaseComponent } from './components/add-edit-country-case/add-edit-country-case.component';


@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    NavbarComponent,
    SearchCasesComponent,
    ImportDataComponent,
    AddEditCountryCaseComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      disableTimeOut:true,
      positionClass:'toast-top-right',
      preventDuplicates: true,
      closeButton:true
    }),
    BrowserAnimationsModule,
    ModalModule
  
   
  ],
  providers: [Covid19APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
