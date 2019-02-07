


import { Component, OnInit, Inject, Input, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ErrorService } from '../error.service';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-spinner-dialog',
  templateUrl: './spinner-dialog.component.html',
  styleUrls: ['./spinner-dialog.component.scss']
})
export class SpinnerDialogComponent implements OnInit {

  message: string
  subscription: any;


  constructor(public dialogRef: MatDialogRef<ErrorService>,
     @Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService) { }

  ngOnInit() {
    this.message = this.data.message;
    this.subscription = this.dataService.spinnerCloseEvent.subscribe(() => {
      //console.log('spinner-dialog-subscription')
      this.close()
    });
  }

  close(){
    let _this = this
    _this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
