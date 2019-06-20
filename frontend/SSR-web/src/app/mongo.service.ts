

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MongoService {

  constructor(
    private http: HttpClient,
    )
     {}

  getCollections(){
    return 
  }

  getDocument(query : JSON){//query format: {collection:value, data:{doc query}}
    return this.http.post(environment.mongoDB_URL + 'document/', query);
  }

  getDocumentsByQuery(query : JSON){//query format: {collection:value, data:{doc query}}
    return this.http.post(environment.mongoDB_URL + 'documents/', query);
  }

  addDocument(document: JSON){//doc format: {collection:value, data:{doc attributes}}
    return this.http.post(environment.mongoDB_URL + 'add/document', document);
  }

  getCollection(name: string): Observable<Object>{
    return this.http.get(environment.mongoDB_URL + 'collection/' + name);
  }

  addCollection(name : string, schema: JSON){
    let data = {collection: name, schema: schema};
    return this.http.post(environment.mongoDB_URL + 'add/collection', data)
  }

  deleteDocument(document: JSON){//query format: {collection:value, data:{doc query}}
    return this.http.put(environment.mongoDB_URL + 'delete/document', document)
  }

  deleteCollection(name: string){
    let json = {collection: name}
    return this.http.put(environment.mongoDB_URL + 'delete/collection', json)
  }

  updateDocument(document: JSON){
    return this.http.put(environment.mongoDB_URL + '/update/document', document)
  }







}
