import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { SessionComponent } from '../session/session.component';
import { DataService } from '../data.service';
import { Sensor } from 'src/classes/sensor';

@Component({
  selector: 'app-target-configure-sheet',
  templateUrl: './target-configure-sheet.component.html',
  styleUrls: ['./target-configure-sheet.component.scss']
})
export class TargetConfigureSheetComponent implements OnInit {

  sensors: Object
  targets: Object
  chosenTarget: Object
  trigerBySensor: Object
  responseTime: number
  actionTime: number

  responseTimes = [0,1,2,3,4,5,6,10,15,20,30,60]
  actionTimes = [0,1,2,3,4,5,6,10,15,20,30,60]

  constructor(private bottomSheetRef: MatBottomSheetRef<SessionComponent>, private data: DataService) { }

  ngOnInit() {
    this.sensors = this.data.sensors
    this.targets = this.data.targets
    this.chosenTarget = this.data.chosenTarget
  }

  set(): void {
    if(this.trigerBySensor !== undefined && this.responseTime !== undefined && this.actionTime !== undefined){
    this.data.trigerBySensorId = (this.trigerBySensor as Sensor).id
    this.data.trigerActionTime = this.actionTime
    this.data.trigerResponseTime = this. responseTime
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    }
  }
  cancle(): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
 