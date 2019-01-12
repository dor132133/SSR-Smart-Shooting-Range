import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../sessions.service';
import { Session } from 'src/classes/session';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  sessions = [];

  constructor(private sessionsService: SessionsService) { }

  ngOnInit() {
    this.getSessions();
  }

  getSessions(){
    this.sessionsService.getSessions((data) => {
      this.sessions = Object.values(data);
    })
      
    
    // .then(function(data){
    //   console.log(data)
    //   //this.sessions = data;
    // })
  }

  addSession(){
    let session = new Session('mapId',new Date, 'warriorId','',[]);
    this.sessionsService.addSession(session).subscribe(res =>{
      console.log(res)
    })
  }

  

}
