import { Injectable } from '@angular/core';
import { MongoService } from './mongo.service';
import { Warrior } from 'src/classes/warrior';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class WarriorsService {

  warriors = [];

  constructor(private mondoDB: MongoService, private errorService: ErrorService) {
  }

  getWarriors(callback: (data) => void) {
     return this.mondoDB.getCollection('warriors').subscribe(data => {
       this.warriors = Object.values(data);
       callback(data);
    })
  }

  getWarriorByDate(date: Date){
    return this.warriors.find(function(element){
        return element.date===date;
    })
  }

  addWarrior(warrior: Warrior, callback: (data) => void){
    var doc = {
        collection: "warriors",
        data: warrior
    }
    var query = JSON.stringify(doc)
    var _this=this;
    //console.log(query)
    this.mondoDB.addDocument(JSON.parse(query)).subscribe(
      res => console.log('HTTP response', res),
      err => {
        _this.errorService.httpErrorHandler(err);
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
    this.mondoDB.deleteDocument(JSON.parse(query)).subscribe(
      res => console.log('HTTP response', res),
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
      });                  
  }

}
