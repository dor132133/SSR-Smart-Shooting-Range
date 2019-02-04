import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {

  topic: string
  question: string

  constructor(public dialogRef: MatDialogRef<ErrorService>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.topic = this.data.topic
    this.question = this.data.question
  }

  onNoClick(): void{
    this.dialogRef.close(false);
  }

  onYesClick(){
    this.dialogRef.close(true);
  }

}
