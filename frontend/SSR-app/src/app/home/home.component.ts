import { Component, OnInit } from '@angular/core';
import { MongoService } from '../mongo.service';
import { user } from '../../interfaces/user'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  warriors: Object;
  users: user[] = [];
  usersNames = [];

  constructor(private mondoDB: MongoService) { }

  ngOnInit() {
  //  this.mondoDB.getCollection('warriors').subscribe(data => {
  //    this.warriors = data;
  //     console.log(data)
  //  })
  }

  
  addDocumentButton(){
    var query = JSON.stringify({ collection : "users",
                                data: {
                                  firstname: "Uzi",
                                  lastname: "Cohen",
                                  age: 45,
                                  team: "UDI"
                                }
                                })
    this.mondoDB.addDocument(JSON.parse(query)).subscribe(res =>{
      console.log(res)
    })
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

  showCollectionButton(name: string){
    try{
      this.mondoDB.getCollection(name).subscribe(data =>{
        console.log(data)
        this.users = Object.values(data)
        this.usersNames = this.users.map(element => {
          return element.firstname;
        })
        console.log(typeof(this.usersNames))
        console.log(this.usersNames)
      })
    }
    catch(e){
      //this.error.simpleToast("Connection error");
      console.log(e);
    }
  }

  DeleteDocumentButton(){
    var query = JSON.stringify({ collection : "users",
                       data: {
                         firstname: "Uzi"
                        }
                })
    this.mondoDB.deleteDocument(JSON.parse(query)).subscribe(res =>{
      console.log(res)
    })   
                         
  }



}
