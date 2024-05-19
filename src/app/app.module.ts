import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { AddEditCountryCaseComponent } from './components/add-edit-country-case/add-edit-country-case.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularMaterialModule } from './angular-material.module';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { AuthTokenInterceptorService } from './interceptors/auth-token.interceptor.service';
import { UserService } from './services/user.service';
import { JwtModule } from '@auth0/angular-jwt';
import { IfAdminUser } from './directives/if-admin.directive';
import { IfUser } from './directives/if-user.directive';
import { IsGrantedDirective } from './directives/is-granted.directive';



@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    NavbarComponent,
    SearchCasesComponent,
    ImportDataComponent,
    AddEditCountryCaseComponent,
    LoginComponent,
    RegisterComponent,
    IfAdminUser,
    IfUser,
    IsGrantedDirective
    
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
    AngularMaterialModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>localStorage.getItem("accessToken")
      }
    })
  
   
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS, 
      useClass:AuthTokenInterceptorService, 
      multi:true
    },
    Covid19APIService, 
    provideAnimationsAsync(), 
    AuthService,
    UserService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
