import { Injectable } from '@angular/core';
import { MongoService } from './mongo.service';
import { Warrior } from 'src/classes/warrior';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class WarriorsService {

  warriors = [];

  constructor(private mongoDB: MongoService, private errorService: ErrorService) {
  }

  getWarriors(callback: (data) => void) {
    var _this=this;
     return this.mongoDB.getCollection('warriors').subscribe(data => {
       this.warriors = Object.values(data);
       callback(data);
    },err=> {
      _this.errorService.httpErrorHandler(err);
    })
  }

  getWarriorById(myId: string, callback: (data) => void){
    let warrior = { collection: "warriors",
                    data: { _id: myId}
                  }
    let query = JSON.stringify(warrior)
    var _this = this
    this.mongoDB.getDocument(JSON.parse(query)).subscribe(data => {
      callback(data);
   },err=> {
     _this.errorService.httpErrorHandler(err);
   })              
  }

  getWarriorByQuery(query: JSON, callback: (data) => void){
    var doc = JSON.stringify({  collection : "warriors",
                                  data: query
                               })
    var _this=this
    this.mongoDB.getDocument(JSON.parse(doc)).subscribe(data => {
      callback(data);
    },err=> {
      _this.errorService.httpErrorHandler(err);
    })              

  }

  addWarrior(warrior: Warrior, callback: (data) => void){
    var doc = {
        collection: "warriors",
        data: warrior
    }
    var query = JSON.stringify(doc)
    var _this=this;
    console.log(query)
    this.mongoDB.addDocument(JSON.parse(query)).subscribe(
      res => {
        console.log('HTTP response', res)
      },
      err => {
        let message:string = _this.errorService.httpErrorHandler(err);
        let warriorId:string
        if(message.indexOf('_id')!==-1){
          warriorId=message.substring(message.indexOf('_id')+5)
          err.warriorId = warriorId
          callback(err)
        }
        else
          callback(err)
      }); 
  }

  DeleteWarrior(warrior: Warrior, callback: (data) => void){
    var doc = {
        collection: "warriors",
        data: warrior
    }
    var query = JSON.stringify(doc)
    var _this=this;
    this.mongoDB.deleteDocument(JSON.parse(query)).subscribe(
      res => console.log('HTTP response', res),
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
      });                  
  }

  updateWarrior(originWarrior: Warrior,updateWarrior: Warrior, callback: (data) => void){
      var doc = {
        collection: "warriors",
        data: {
          origin: originWarrior,
          new: updateWarrior
        }
      }
      var query = JSON.stringify(doc)
      var _this=this;
      this.mongoDB.updateDocument(JSON.parse(query)).subscribe(
        res => console.log('HTTP response', res),
        err => {
          _this.errorService.httpErrorHandler(err);
          callback(err)
        });                  
  }
  
  

}
