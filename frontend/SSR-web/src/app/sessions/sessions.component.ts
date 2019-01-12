import { Component, OnInit, Inject } from '@angular/core';
import { SessionsService } from '../sessions.service';
import { Session } from 'src/classes/session';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NewSessionDialogComponent } from '../new-session-dialog/new-session-dialog.component';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {

  sessions = [];

  constructor(private sessionsService: SessionsService, private dialog: MatDialog) { }

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
    this.sessionsService.addSession(session).subscribe(res =>{
      console.log(res)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewSessionDialogComponent, {
      width: '1500px',
            //data: {name: 'New Session', animal: this.animal} //pass data into the dialog
    });

  dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      console.log(result);
    });
  }


}
