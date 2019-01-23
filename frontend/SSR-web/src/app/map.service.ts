import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { MongoService } from './mongo.service';
import { Map } from 'src/classes/map';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  maps = []
  constructor(private errorService: ErrorService, private mongoDB: MongoService) { }

  getMaps(callback: (data) => void) {
    var _this=this;
     return this.mongoDB.getCollection('maps').subscribe(data => {
       this.maps = Object.values(data);
       callback(data);
    },err=> {
      _this.errorService.httpErrorHandler(err);
    })
  }

  getMapById(myId: string, callback: (data) => void){
    let warrior = { collection: "maps",
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

  getMapByQuery(query: JSON, callback: (data) => void){
    var doc = JSON.stringify({  collection : "maps",
                                  data: query
                               })
    var _this=this
    this.mongoDB.getDocument(JSON.parse(doc)).subscribe(data => {
      callback(data);
    },err=> {
      _this.errorService.httpErrorHandler(err);
    })              

  }

  addMap(map: Map, callback: (data) => void){
    var doc = {
        collection: "maps",
        data: map
    }
    var query = JSON.stringify(doc)
    var _this=this;
    //console.log(query)
    this.mongoDB.addDocument(JSON.parse(query)).subscribe(
      res => console.log('HTTP response', res),
      err => {
        _this.errorService.httpErrorHandler(err);
        callback(err)
      }); 
  }

  DeleteMap(map: Map, callback: (data) => void){
    var doc = {
        collection: "maps",
        data: map
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

  updateMap(originMap: Map,updateMap: Map, callback: (data) => void){
      var doc = {
        collection: "maps",
        data: {
          origin: originMap,
          new: updateMap
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
