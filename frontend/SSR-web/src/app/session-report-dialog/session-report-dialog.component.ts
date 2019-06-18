import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SessionsComponent } from '../sessions/sessions.component';
import { ErrorService } from '../error.service';
import { MapService } from '../map.service';
import { Session } from 'src/classes/session';

@Component({
  selector: 'app-session-report-dialog',
  templateUrl: './session-report-dialog.component.html',
  styleUrls: ['./session-report-dialog.component.scss']
})
export class SessionReportDialogComponent implements OnInit {

  session
  map
  warrior
  sensorsTableContent
  sensorsTableColumns = ['Events', 'Sensor ID', 'Cross Time']
  targetsShotsTableColumns = ['Events', 'Target ID', 'Hit Time', 'Coords']
  targetsShotsTableContent


  constructor(public dialogRef: MatDialogRef<SessionsComponent>, private errorService: ErrorService, private mapService: MapService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.session = this.data.session
    this.map = this.session.map
    this.warrior = this.session.warrior
    this.sensorsTableContent = this.session.sensorsEventsFlow
    this.targetsShotsTableContent = this.session.targetsEventsFlow
    console.log('session: ',this.session)
    console.log('map: ',this.map)
    console.log('warrior: ',this.warrior)

  }


  close(flag: boolean){
    let data;
    if(!flag){
      this.dialogRef.close(flag);
      return
    }
    this.dialogRef.close(data);
  }

}
