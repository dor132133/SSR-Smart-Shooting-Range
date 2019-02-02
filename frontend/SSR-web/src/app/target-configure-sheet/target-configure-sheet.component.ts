import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { SessionComponent } from '../session/session.component';
import { DataService } from '../data.service';

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
  constructor(private bottomSheetRef: MatBottomSheetRef<SessionComponent>, private data: DataService) { }

  ngOnInit() {
    this.sensors = this.data.sensors
    this.targets = this.data.targets
    this.chosenTarget = this.data.chosenTarget
  }

  set(): void {
    if(this.trigerBySensor !== undefined){
    this.data.trigerBySensor=this.trigerBySensor
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    }
  }
  cancle(): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
 