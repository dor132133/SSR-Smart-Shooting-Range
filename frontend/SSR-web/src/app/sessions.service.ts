



import { Injectable } from '@angular/core';
import { MongoService } from './mongo.service';
import { Session } from '../classes/session'
import { ErrorService } from './error.service';


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  sessions = [];

  constructor(private mondoDB: MongoService,private errorService: ErrorService) {
  }

  getSessions(callback: (data) => void) {
     return this.mondoDB.getCollection('sessions').subscribe(data => {
       this.sessions = Object.values(data);
       //console.log(this.sessions)
       callback(data);
    })
  }

  getSessionByDate(date: Date,callback: (res) => void){
    return this.sessions.find(function(element){
        return element.date===date;
    })
  }

  addSession(session: Session ,callback: (res) => void){
    var doc = {
        collection: "sessions",
        data: session
    }
    var query = JSON.stringify(doc)
    //console.log(query)
    var _this=this;
    this.mondoDB.addDocument(JSON.parse(query)).subscribe(
      res => console.log('HTTP response', res),
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
      }); 
  }

  DeleteSession(session: Session,callback: (res) => void){
    var doc = {
        collection: "sessions",
        data: session
    }
    var query = JSON.stringify(doc)
    var _this=this
    this.mondoDB.deleteDocument(JSON.parse(query)).subscribe(
      res => console.log('HTTP response', res),
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
      });                  
  }




}
