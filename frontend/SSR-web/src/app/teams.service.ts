import { Injectable } from '@angular/core';
import { MongoService } from './mongo.service';
import { Team } from 'src/classes/team';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teams = []

  constructor(private mongoDB: MongoService,private errorService: ErrorService) { }

  getTeams(callback: (data) => void) {
      return this.mongoDB.getCollection('teams').subscribe(data => {
        this.teams = Object.values(data);
        callback(data);
    })
  }

  getTeamById(myId: string, callback: (data) => void){
    let warrior = { collection: "teams",
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

  getTeamByQuery(query: JSON, callback: (data) => void){
    var doc = JSON.stringify({  collection : "teams",
                                  data: query
                               })
    var _this=this
    this.mongoDB.getDocument(JSON.parse(doc)).subscribe(data => {
      callback(data);
    },err=> {
      _this.errorService.httpErrorHandler(err);
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
    this.mongoDB.addDocument(JSON.parse(query)).subscribe(
      res => {
        console.log('HTTP response', res)
      },
      err => {
        let message:string = _this.errorService.httpErrorHandler(err);
        let teamId:string
        if(message.indexOf('_id')!==-1){
          teamId=message.substring(message.indexOf('_id')+5)
          err.teamId = teamId
          callback(err)
        }
        else
          callback(err)
      }); 
  }

  deleteTeam(team: Team,callback: (res) => void){
  var doc = {
      collection: "teams",
      data: team
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

  updateTeam(originTeam: Team, updateTeam: Team, callback: (res)=> void){
    var doc = {
      collection: "teams",
      data: {
        origin: originTeam,
        new: updateTeam
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
