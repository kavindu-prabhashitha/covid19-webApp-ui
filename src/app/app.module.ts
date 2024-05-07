import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Covid19APIService } from './services/covid19API.service';
import { KeysPipe } from './pipes/key.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchCasesComponent } from './components/search-cases/search-cases.component';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    NavbarComponent,
    SearchCasesComponent,
    ImportDataComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      disableTimeOut:true,
      positionClass:'toast-top-right',
      preventDuplicates: true,
      closeButton:true
    }),
    BrowserAnimationsModule
  
   
  ],
  providers: [Covid19APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
