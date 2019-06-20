import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectionsComponent } from '../collections/collections.component';
import { SessionsService } from '../sessions.service';

@Component({
  selector: 'app-warrior-report-dialog',
  templateUrl: './warrior-report-dialog.component.html',
  styleUrls: ['./warrior-report-dialog.component.scss']
})
export class WarriorReportDialogComponent implements OnInit {

  warrior
  warriorSessions = []

  constructor(public dialogRef: MatDialogRef<CollectionsComponent>, public sessionsService: SessionsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.warrior = this.data.warrior
    console.log('Warrior: ', this.warrior)
    this.initWarriorSessions()
  }

  initWarriorSessions(){
    this.sessionsService.getSessionsByWarrior(this.warrior, sessions=>{
      this.warriorSessions = sessions
    })
  }

}
