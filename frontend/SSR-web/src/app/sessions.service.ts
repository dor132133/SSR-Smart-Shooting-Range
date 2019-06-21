



import { Injectable } from '@angular/core';
import { MongoService } from './mongo.service';
import { Session } from '../classes/session'
import { ErrorService } from './error.service';
import { Warrior } from 'src/classes/warrior';
import { Map } from 'src/classes/map';
import { MapService } from './map.service';
import { WarriorsService } from './warriors.service';


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  sessions = [];

  constructor(private mondoDB: MongoService,private errorService: ErrorService, private mapService: MapService, private warriorService: WarriorsService) {
  }

  getSessions(callback: (data) => void) {
     return this.mondoDB.getCollection('sessions').subscribe(data => {
       this.sessions = Object.values(data);
       //console.log(this.sessions)
       callback(data);
    })
  }

  sessionsToListing(sessions,callback: (data) => void){
    var mySessions = [];
    let processItems = 0
    sessions.forEach((element)=>{
        let session = (element as Session)
        this.mapService.getMapById(session.mapId, map =>{
          this.warriorService.getWarriorById(session.warriorId, warrior => {
            let mySession = {
              date: new Date((element as Session).date).toUTCString(),
              totalTime: (element as Session).totalTime,
              map: map as Map,
              warrior: warrior as Warrior,
              sensorsEventsFlow: (element as Session).sensorsEventsFlow,
              targetsEventsFlow: (element as Session).targetsEventsFlow
            }
              mySessions.push(mySession)
              processItems++;
              if(processItems == mySessions.length)
                callback(mySessions);
          })
        })
    })
  }

  getSessionsByWarrior(warrior: Warrior, callback: (data) => void) {
     var query = JSON.parse(JSON.stringify({collection:'sessions', data:{warriorId: warrior._id}}))
     return this.mondoDB.getDocumentsByQuery(query).subscribe(data => {
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
        let message:string = _this.errorService.httpErrorHandler(err);
        let sessionId:string
        if(message.indexOf('_id')!==-1){
          sessionId=message.substring(message.indexOf('_id')+5)
          err.sessionId = sessionId
          callback(err)
        }
        else
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
