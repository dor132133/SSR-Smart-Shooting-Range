import { Component, OnInit, Inject } from '@angular/core';
import { SessionsService } from '../sessions.service';
import { Session } from 'src/classes/session';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewSessionDialogComponent } from '../new-session-dialog/new-session-dialog.component';
import { Router, NavigationExtras } from '@angular/router';
import { MapService } from '../map.service';
import { DataService } from '../data.service';
import { WarriorsService } from '../warriors.service';
import { Map } from 'src/classes/map';
import { Warrior } from 'src/classes/warrior';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  sessions = [];

  constructor(private sessionsService: SessionsService, private dataService: DataService, private warriorService: WarriorsService,
     private mapService: MapService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.getSessions();
  }

  getSessions(){
    this.sessions = [];
    this.sessionsService.getSessions((data) => {
      data = Object.values(data).filter(function(element){
        return element['empty']==undefined
      })
      data.forEach((element)=>{
        let session = (element as Session)
        this.mapService.getMapById(session.mapId, map =>{
          this.warriorService.getWarriorById(session.warriorId, warrior => {
            let mySession = {
              date: new Date((element as Session).date).toUTCString(),
              time: (element as Session).time,
              map: map as Map,
              warrior: warrior as Warrior
            }
            this.sessions.push(mySession)
          })
        })
        
      })
    })
  }

  openNewSessionDialog(): void {
    const dialogRef = this.dialog.open(NewSessionDialogComponent, {
      width: '1500px',
            //data: {name: 'New Session', animal: this.animal} //pass data into the dialog
    });

  dialogRef.afterClosed().subscribe(result => { 
      //console.log('The dialog was closed');
      //console.log(result);
      if(result == false)
        return
      this.mapService.getMapByQuery(result.map,data =>{
        //console.log(data)
      })
      this.startSession(result)
    });
  }

  startSession(data) {
    this.dataService.map = data.map
    this.dataService.warrior = data.warrior
    this.router.navigate(['/session']).then( (e) => {
      if (e) {
        //console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  };

  openSessionDialog(): void {
    console.log('clicked')
  }

}
