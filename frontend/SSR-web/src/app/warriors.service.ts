import { Injectable } from '@angular/core';
import { MongoService } from './mongo.service';
import { Warrior } from 'src/classes/warrior';

@Injectable({
  providedIn: 'root'
})
export class WarriorsService {

  warriors = [];

  constructor(private mondoDB: MongoService) {
  }

  getWarriors(callback: (data) => void) {
     return this.mondoDB.getCollection('warriors').subscribe(data => {
       this.warriors = Object.values(data);
       //console.log(this.sessions)
       callback(data);
    })
  }

  getWarriorByDate(date: Date){
    return this.warriors.find(function(element){
        return element.date===date;
    })
  }

  addWarrior(warrior: Warrior){
    var doc = {
        collection: "warriors",
        data: warrior
    }
    var query = JSON.stringify(doc)
    console.log(query)
    return this.mondoDB.addDocument(JSON.parse(query))
  }

  DeleteWarrior(warrior: Warrior){
    var doc = {
        collection: "warriors",
        data: warrior
    }
    var query = JSON.stringify(doc)
    return this.mondoDB.deleteDocument(JSON.parse(query))                 
  }

}
