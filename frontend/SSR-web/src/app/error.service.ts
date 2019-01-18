

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(public snackBar: MatSnackBar) { }



  httpErrorHandler(err: HttpErrorResponse){
    console.log(err.status + ', ' + err.error)
    if(err.status != 200)
      this.openSnackBar(err.error,err.status.toString())
  }



  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
}

}