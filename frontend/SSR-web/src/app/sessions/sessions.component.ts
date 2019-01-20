import { Component, OnInit, Inject } from '@angular/core';
import { SessionsService } from '../sessions.service';
import { Session } from 'src/classes/session';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewSessionDialogComponent } from '../new-session-dialog/new-session-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  sessions = [];

  constructor(private sessionsService: SessionsService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.getSessions();
  }

  getSessions(){
    this.sessionsService.getSessions((data) => {
      this.sessions = Object.values(data);
    })
  }

  addSession(){
    let session = new Session('mapId',new Date, 'warriorId','',[]);
    var _this = this
    this.sessionsService.addSession(session, (res) => {
      if(res.status == 200)
        _this.getSessions()
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewSessionDialogComponent, {
      width: '1500px',
            //data: {name: 'New Session', animal: this.animal} //pass data into the dialog
    });

  dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //console.log(result);
      console.log('close');
    });
  }

  startSession() {
          this.router.navigate(['/session']).then( (e) => {
            if (e) {
              //console.log("Navigation is successful!");
            } else {
              console.log("Navigation has failed!");
            }
          });
  };


}
