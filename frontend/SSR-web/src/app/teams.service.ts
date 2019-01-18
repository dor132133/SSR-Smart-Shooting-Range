import { Injectable } from '@angular/core';
import { MongoService } from './mongo.service';
import { Team } from 'src/classes/team';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams = []

  constructor(private mondoDB: MongoService,private errorService: ErrorService) { }

  getTeams(callback: (data) => void) {
      return this.mondoDB.getCollection('teams').subscribe(data => {
        this.teams = Object.values(data);
        callback(data);
    })
  }

  addTeam(team: Team ,callback: (res) => void){
    var doc = {
        collection: "teams",
        data: team
    }
    var query = JSON.stringify(doc)
    //console.log(query)
    var _this=this;
    this.mondoDB.addDocument(JSON.parse(query)).subscribe(
      res => console.log('HTTP response', res),
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
      }); 
  }

  DeleteTeam(team: Team,callback: (res) => void){
  var doc = {
      collection: "teams",
      data: team
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
