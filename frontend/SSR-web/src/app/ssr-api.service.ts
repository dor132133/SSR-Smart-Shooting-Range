import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class SsrApiService {


  constructor(private http: HttpClient, private errorService: ErrorService) { 
    
  }

  createWebSocketConnection(webSocket){
    
    webSocket.subscribe(
      (message) => {
        console.log(message)
      },
      (err) => console.error(err),
      () => console.warn('Completed!')
    );
  }

  createWebSocketConnectionOld(){
    console.log('creating....')
    const url = 'wss://192.168.1.140'
    const ws = new WebSocket(url)
    ws.onopen = () => {
      console.log('webSocket connecting successfully!')
      ws.send('hey')
    }
    ws.onerror = error => {
      console.log('WebSocket error: ', error)
    }
    
    ws.onmessage = (message) => {
      console.log(message)
    }
  
  }

  readySession(callback: (data) => void){
    var _this = this
    this.http.get(environment.API_URL + 'ready-session/').subscribe(
      res => {
        callback(res)
      },
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
    })  
  }

  startSession(callback: (data) => void){
    var _this = this
    this.http.get(environment.API_URL + 'start-session/').subscribe(
      res => {
        callback(res)
      },
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
    })  
  }

  pauseSession(callback: (data) => void){
    var _this = this
    this.http.get(environment.API_URL + 'pause-session/').subscribe(
      res =>{
        callback(res)
      },
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
    })  
  }

  resumeSession(callback: (data) => void){
    var _this = this
    this.http.get(environment.API_URL + 'resume-session/').subscribe(
      res => {
        callback(res)
      },
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
    })  
  }

  endSession(callback: (data) => void){
    var _this = this
    this.http.get(environment.API_URL + 'end-session/').subscribe(
      res => {
        callback(res)
      },
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
    })  
  }



}
