import { Injectable } from '@angular/core';
import { MongoService } from './mongo.service';
import { User } from 'src/classes/user';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users = []

  constructor(private mondoDB: MongoService,private errorService: ErrorService) { }

  getUsers(callback: (data) => void) {
    return this.mondoDB.getCollection('users').subscribe(data => {
      this.users = Object.values(data);
      callback(data);
   })
 }


 addUser(team: User, callback: (data) => void){
  var doc = {
      collection: "users",
      data: team
  }
  var query = JSON.stringify(doc)
  //console.log(query)
  var _this=this;
  this.mondoDB.addDocument(JSON.parse(query)).subscribe(
    res => console.log('HTTP response', res),
    err => {
      let message:string = _this.errorService.httpErrorHandler(err);
      let userId:string
      if(message.indexOf('_id')!==-1){
        userId=message.substring(message.indexOf('_id')+5)
        err.userId = userId
        callback(err)
      }
      else
        callback(err)
    }); 
}

DeleteUser(user: User, callback: (data) => void){
  var doc = {
      collection: "users",
      data: user
  }
  var query = JSON.stringify(doc)
  var _this=this;
  this.mondoDB.deleteDocument(JSON.parse(query)).subscribe(
    res => console.log('HTTP response', res),
    err => {
      _this.errorService.httpErrorHandler(err);
      callback(err)
  });                  
}


}
