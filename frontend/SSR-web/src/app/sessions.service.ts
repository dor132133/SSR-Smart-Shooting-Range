



import { Injectable } from '@angular/core';
import { MongoService } from './mongo.service';
import { Session } from '../classes/session'


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  sessions = [];

  constructor(private mondoDB: MongoService) {
  }

  getSessions(callback: (data) => void) {
     return this.mondoDB.getCollection('sessions').subscribe(data => {
       this.sessions = Object.values(data);
       //console.log(this.sessions)
       callback(data);
    })
  }

  getSessionByDate(date: Date){
    return this.sessions.find(function(element){
        return element.date===date;
    })
  }

  addSession(session: Session){
    var doc = {
        collection: "sessions",
        data: session
    }
    var query = JSON.stringify(doc)
    console.log(query)
    return this.mondoDB.addDocument(JSON.parse(query))
  }

  DeleteSession(session: Session){
    var doc = {
        collection: "sessions",
        data: session
    }
    var query = JSON.stringify(doc)
    return this.mondoDB.deleteDocument(JSON.parse(query))                 
  }




}
