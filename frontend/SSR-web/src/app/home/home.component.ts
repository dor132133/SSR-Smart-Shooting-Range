import { Component, OnInit } from '@angular/core';
import { MongoService } from '../mongo.service';
import { User } from 'src/classes/user'
import { Session } from 'src/classes/session';
import { SessionsService } from '../sessions.service';
import { Warrior } from 'src/classes/warrior';
import { Map } from 'src/classes/map';
import { JobType } from 'src/enums';
import { WarriorsService } from '../warriors.service';
import { SsrApiService } from '../ssr-api.service';
import { interval } from 'rxjs';
import { StopwatchService } from '../stopwatch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  warriors: Object;
  users: Object;
  sessions: Object;

  constructor(private mondoDB: MongoService, private apiService: SsrApiService,
     private sessionsService: SessionsService, private warriorsService: WarriorsService,
     private stopWatch: StopwatchService) 
     { }

  ngOnInit() {
    
  }

  startSession(){
    let data
    console.log(data)
      this.apiService.startSession(data).subscribe(res => {
        //this.sessions = Object.values(data);
        console.log(res)
        //callback(data);
     })
  }


  updateWarriorButton(){
    this.warriorsService.getWarriorById('5c427cf576b68700434170cc',(warrior) => {
      var newWarrior = <Warrior>JSON.parse(JSON.stringify(warrior));
      newWarrior.firstname = 'Dude'
      console.log(warrior)
      console.log(newWarrior)
      this.warriorsService.updateWarrior(warrior,newWarrior, (data)=> {
        console.log(data)
      })
    })
  }

  getWarriorByQuery(){
    var query = JSON.stringify({  collection : "warriors",
                                  data: {firstname : "Dor"}
                               })
    this.mondoDB.getDocument(JSON.parse(query)).subscribe(res => console.log(res))
  }

  showCollectionButton(name: string){
    this.mondoDB.getCollection(name).subscribe(data =>{
      console.log(data)
      //data.data return the object as an array
      this.sessions = Object.values(data).slice(1);//slice the empty doc (that creates automaticlly)
      console.log(this.sessions)
    })
  }

  addDocumentButton(){
    let session = new Session('mapId',new Date, 'warriorId','','');
    this.sessionsService.addSession(session, (res) =>{
      console.log(res)
    })
  }

  //Administrator users only
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
    var query = JSON.stringify({ collection : "maps",
                       data: {
                        trainName: "Lotar02"
                        }
                })
    this.mondoDB.deleteDocument(JSON.parse(query)).subscribe(res =>{
      console.log(res)
    })   
                         
  }


}
