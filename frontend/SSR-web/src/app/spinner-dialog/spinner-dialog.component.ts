


import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-spinner-dialog',
  templateUrl: './spinner-dialog.component.html',
  styleUrls: ['./spinner-dialog.component.scss']
})
export class SpinnerDialogComponent implements OnInit {

  message: string
  constructor(public dialogRef: MatDialogRef<ErrorService>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.message = this.data.message;
    var _this = this;
    // setTimeout(function(){
    //   _this.close()
    // }, 2000)
  }

  close(){
    this.dialogRef.close();
  }

}
