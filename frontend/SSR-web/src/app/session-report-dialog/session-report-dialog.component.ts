import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SessionsComponent } from '../sessions/sessions.component';
import { Target } from 'src/classes/target';
import { WarriorReportDialogComponent } from '../warrior-report-dialog/warrior-report-dialog.component';

@Component({
  selector: 'app-session-report-dialog',
  templateUrl: './session-report-dialog.component.html',
  styleUrls: ['./session-report-dialog.component.scss']
})
export class SessionReportDialogComponent implements OnInit {

  session
  map
  warrior
  sensorsTableColumns:string[] = ['eventGapTime', 'sensorId', 'crossTime']
  targetsShotsTableColumns: string[] = ['eventGapTime', 'targetId', 'time', 'coords']
  densityTargetsColumns: string[] = ['targetId', 'density']
  sensorsTableContent
  targetsShotsTableContent
  densityTargetsContent = []
 


  constructor(public dialogRef: MatDialogRef<SessionsComponent, WarriorReportDialogComponent>,
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
    this.densityTargetsContent = []
    this.densityCalc()
  }

  //not ready yet! 
  densityCalc(){ 
    //console.log(this.map.targets)
    this.map.targets.forEach(target => {
      var shotsProcessed = 0;
      var density = 0;
      // console.log('target:',target.id);
      (target as Target).shots.forEach(shot => {
        // console.log('shot');
        density = density + Math.random() * (10 - 0) + 0
        density = parseFloat(density.toFixed(2));
        shotsProcessed++
      })
      if(shotsProcessed == (target as Target).shots.length)
        this.densityTargetsContent.push({targetId: (target as Target).id, density: density })
    })
  }

  close(flag: boolean){
    let data;
    if(!flag){
      this.dialogRef.close();
      return
    }
    this.dialogRef.close(data);
  }

}
