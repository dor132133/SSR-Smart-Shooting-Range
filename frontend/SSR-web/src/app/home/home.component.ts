
import { Component, OnInit } from '@angular/core';
import { MongoService } from '../mongo.service';
import { User } from 'src/classes/user'
import { Session } from 'src/classes/session';
import { SessionsService } from '../sessions.service';
import { Warrior } from 'src/classes/warrior';
import { Map } from 'src/classes/map';
import { JobType } from 'src/enums';
import { WarriorsService } from '../warriors.service';
import { WebSocketService } from '../websocket.service';
import { interval } from 'rxjs';
import { StopwatchService } from '../stopwatch.service';
import { ErrorService } from '../error.service';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  warriors: Object;
  users: Object;
  sessions: Object;
  webSocket: WebSocketSubject<Message>;

  constructor(private mondoDB: MongoService, private socketService: WebSocketService,
     private sessionsService: SessionsService, private warriorsService: WarriorsService,
     private stopWatch: StopwatchService, public errorService: ErrorService) 
     { 
      
     }

  ngOnInit() {

  }


  // connect3(){
  //   this.socketService.serviceGateWay('connect',res=> {
  //     console.log('res:', res)
  //   })
  // }



  // connect1(){
  //   this.errorService.spinnerOn('Connecting to server and ESP...');
  //   this.socketService.readySession(res => {
  //     if (res.status == 200) {
  //       var _this = this;
  //       setTimeout(function(){
  //         this.espConnectionFlag=true;
  //         console.log('connected')
  //         _this.errorService.spinnerOff()
  //       }, 2000)
  //     }
  //   })
  // }

 
  //sensitive method
  recreateAllCollections(){
    this.deleteCollectionButton('warriors')
    this.deleteCollectionButton('sessions')
    this.deleteCollectionButton('teams')
    this.deleteCollectionButton('maps')

    this.addCollectionButton('warriors')
    this.addCollectionButton('sessions')
    this.addCollectionButton('teams')
    this.addCollectionButton('maps')  
    //this.deleteCollectionButton('users')
  }

  recreatCollectionButton(collection){
    this.deleteCollectionButton(collection)
    this.addCollectionButton(collection)
  }

  // startSession(){
  //   let data
  //   console.log(data)
  //     this.apiService.startSession(data).subscribe(res => {
  //       //this.sessions = Object.values(data);
  //       console.log(res)
  //       //callback(data);
  //    })
  // }


  // updateWarriorButton(){
  //   this.warriorsService.getWarriorById('5c427cf576b68700434170cc',(warrior) => {
  //     var newWarrior = <Warrior>JSON.parse(JSON.stringify(warrior));
  //     newWarrior.firstname = 'Dude'
  //     console.log(warrior)
  //     console.log(newWarrior)
  //     this.warriorsService.updateWarrior(warrior,newWarrior, (data)=> {
  //       console.log(data)
  //     })
  //   })
  // }

  // getWarriorByQuery(){
  //   var query = JSON.stringify({  collection : "warriors",
  //                                 data: {firstname : "Dor"}
  //                              })
  //   this.mondoDB.getDocument(JSON.parse(query)).subscribe(res => console.log(res))
  // }

  // showCollectionButton(name: string){
  //   this.mondoDB.getCollection(name).subscribe(data =>{
  //     console.log(data)
  //     //data.data return the object as an array
  //     this.sessions = Object.values(data).slice(1);//slice the empty doc (that creates automaticlly)
  //     console.log(this.sessions)
  //   })
  // }

  // addDocumentButton(){
  //   let session = new Session('mapId',new Date, 'warriorId','','');
  //   this.sessionsService.addSession(session, (res) =>{
  //     console.log(res)
  //   })
  // }

  // Administrator users only
  addCollectionButton(name: string){
     var schema = JSON.parse('{}');
     this.mondoDB.addCollection(name, schema).subscribe(res =>{
       console.log(res)
     })
   } 

  deleteCollectionButton(name: string){
    this.mondoDB.deleteCollection(name).subscribe(res =>{
      console.log(res)
    });
  } 

  DeleteDocumentButton(){
    var query = JSON.stringify({ collection : "teams",
                       data: {
                        name: "ABC"
                        }
                })
    this.mondoDB.deleteDocument(JSON.parse(query)).subscribe(res =>{
      console.log(res)
    })                         
  }


}
