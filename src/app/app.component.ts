import { Component } from '@angular/core';
import { Covid19APIService } from './services/covid19API.service';
import { Cases, ICovidCountryData } from './interfaces';
import { ICommonResponse } from './interfaces/CommonResponse.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid19-webApp';

}
