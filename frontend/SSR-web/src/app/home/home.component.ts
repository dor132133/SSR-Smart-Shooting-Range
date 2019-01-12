import { Component, OnInit } from '@angular/core';
import { MongoService } from '../mongo.service';
import { User } from 'src/classes/user'
import { Session } from 'src/classes/session';
import { SessionsService } from '../sessions.service';
import { Warrior } from 'src/classes/warrior';
import { Map } from 'src/classes/map';
import { TrainType, JobType } from 'src/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  warriors: Object;
  users: Object;
  sessions: Object;
  

  constructor(private mondoDB: MongoService, private sessionsService: SessionsService) { }

  ngOnInit() {

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
    let session = new Session('mapId',new Date, 'warriorId','',[]);
    this.sessionsService.addSession(session).subscribe(res =>{
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
    var query = JSON.stringify({ collection : "sessions",
                       data: {
                         id: "0001"
                        }
                })
    this.mondoDB.deleteDocument(JSON.parse(query)).subscribe(res =>{
      console.log(res)
    })   
                         
  }



}
