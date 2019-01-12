



import { Injectable } from '@angular/core';
import { MongoService } from './mongo.service';
import { Session } from '../classes/session'

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  sessions: Array<Session>;

  constructor(private mondoDB: MongoService) {
    this.getSessions();
   }


  getSessions(){
    this.mondoDB.getCollection('sessions').subscribe(data =>{
      console.log(data)
      this.sessions = Object.values(data).slice(1);//slice the empty doc (that creates automaticlly)
    })
  }

  getSessionByDate(date: Date){
    return this.sessions.find(function(element){
        return element.date===date;
    })
  }

  //unchecked
  addSession(session: Session){
    var doc = {
        collection: "sessions",
        data: [session]
    }
    var query = JSON.stringify(doc)
    console.log(query)
    this.mondoDB.addDocument(JSON.parse(query)).subscribe(res =>{
      console.log(res)
    })
  }

  DeleteSession(session: Session){
    var doc = {
        collection: "sessions",
        data: [session]
    }
    var query = JSON.stringify(doc)
    this.mondoDB.deleteDocument(JSON.parse(query)).subscribe(res =>{
      console.log(res)
    })   
                         
  }




}
