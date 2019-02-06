import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SessionsComponent } from '../sessions/sessions.component';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-session-report-dialog',
  templateUrl: './session-report-dialog.component.html',
  styleUrls: ['./session-report-dialog.component.scss']
})
export class SessionReportDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SessionsComponent>, private errorService: ErrorService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
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
