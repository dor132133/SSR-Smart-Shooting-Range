import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class SsrApiService {

  constructor(private http: HttpClient, private errorService: ErrorService) { }


startSession(message : JSON, callback: (data) => void){
  var _this = this
  this.http.post(environment.API_URL + 'start-session/', message).subscribe(
    res => console.log('HTTP response', res),
    err => {
      _this.errorService.httpErrorHandler(err);
      callback(err)
  })  
}



}
