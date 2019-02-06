

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { SpinnerDialogComponent } from './spinner-dialog/spinner-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {


  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) { 
  }

  httpErrorHandler(err: HttpErrorResponse){
    let message = JSON.parse(JSON.stringify(err.error)).text;
    console.log(err.status + ', ' + message)
    if(err.status != 200)
      this.openSnackBar(err.error,err.status.toString())
    return message
  }

  openMessage(myTopic:string, myQuestion:string, callback: (res) => void): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: {topic: myTopic, question: myQuestion}
    });

    dialogRef.afterClosed().subscribe(result => {
      callback(result)
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  spinnerOn(message: string){
    const dialogRef = this.dialog.open(SpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true,
      data: {message: message} 
    });
    
    dialogRef.afterClosed().subscribe(result => { 
        console.log('Spinner closed');
      });
    
  }

  spinnerOff(){
  //  this.dialogRef.close()
  }

}