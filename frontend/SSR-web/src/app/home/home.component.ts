import { Component, OnInit } from '@angular/core';
import { MongoService } from '../mongo.service';
import { User } from 'src/classes/user'
import { Session } from 'src/classes/session';
import { SessionsService } from '../sessions.service';
import { Warrior } from 'src/classes/warrior';
import { SSRMap } from 'src/classes/map';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  warriors: Object;
  users: Object;
  

  constructor(private mondoDB: MongoService, private sessionsService: SessionsService) { }

  ngOnInit() {
  //  this.mondoDB.getCollection('warriors').subscribe(data => {
  //    this.warriors = data;
  //     console.log(data)
  //  })
  }

  showCollectionButton(name: string){
    this.mondoDB.getCollection(name).subscribe(data =>{
      console.log(data)
      //data.data return the object as an array
      this.users = Object.values(data).slice(1);//slice the empty doc (that creates automaticlly)
      // this.users = Object.values(data)
      // this.usersNames = this.users.map(element => {
      //   return element.firstname;
      // })
      // console.log(typeof(this.usersNames))
      // console.log(this.usersNames)
    })
  }

  addDocumentButton(){
    var query = JSON.stringify({ collection : "users",
                                data: {
                                  firstname: "Itzik",
                                  lastname: "Sna-E",
                                  age: 12,
                                  team: "UDI"
                                }
                                })
    let map = new SSRMap({},'',TrainType.STAGE_ONE,'');
    let warrior = new Warrior('Dor','BY',26,'UDI','',JobType.GUID);
    let session = new Session(map,new Date, warrior,[]);
    console.log(map);
    console.log(warrior);
    console.log(session);

    // var date: Date = new Date();
    // var myTimes: Array<Time>;
    // var warrior: Warrior = new warrior();
    // var session = {
    //   id: "",
    //   map: "1",
    //   date: Date,
    //   warrior: Warrior,
    //   times: myTimes
    // }

    // this.mondoDB.addDocument(JSON.parse(query)).subscribe(res =>{
    //   console.log(res)
    // })
  }

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
    var query = JSON.stringify({ collection : "users",
                       data: {
                         firstname: "Itzik",
                         lastname: "Sna-E"
                        }
                })
    this.mondoDB.deleteDocument(JSON.parse(query)).subscribe(res =>{
      console.log(res)
    })   
                         
  }



}
