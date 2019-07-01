import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { map } from 'rxjs/operators';
import { finished } from 'stream';
import { SessionComponent } from './session/session.component';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socketClient = webSocket({
    url: 'ws://192.168.14.184',
    deserializer: msg => msg
    });

  constructor(private http: HttpClient, private errorService: ErrorService) { 
    // this.socketClient.subscribe();// Note that at least one consumer has to subscribe to the created subject - 
    // //otherwise "nexted" values will be just buffered and not sent, since no connection was established!  
  }

  // This will send a message to the server once a connection is made. Remember value is serialized with JSON.stringify by default!    
  send(msg:string){
    this.socketClient.next(JSON.parse(JSON.stringify(msg)));
    this.socketClient.next(JSON.parse(JSON.stringify(msg)));
  }

  // Closes the connection
  close(){
    console.log('Close')
    this.socketClient.complete(); 
  }

  // Also closes the connection, but let's the server know that this closing is caused by some error.
  closeWithError(){
    console.log('Close with Error')
    this.socketClient.error({code: 400, reason: 'I think our app just broke!'});
  }


  createWebSocketConnection(callback: (data) => void){
    this.socketClient.subscribe(
      (message) => {// Called whenever there is a message from the server.
        this.errorService.openSnackBar(message.data , 'Event')
        console.log(message.data) 
        if(message.data.includes('Hello'))
          callback(true)

        // if(message.data.includes('Finish'))
        //   this.finish()
     
      },
      (err) => console.error(err),// Called if at any point WebSocket API signals some kind of error.
      () => console.warn('Connection closed!')// Called when connection is closed (for whatever reason).
    );
  }

  
  serviceGateWay(cmd, callback: (data) => void){
    switch(cmd){
      case 'connect':
        this.createWebSocketConnection(status => {
          callback(status)
        })
        break;
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
