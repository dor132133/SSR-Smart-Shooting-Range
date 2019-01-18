import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { WarriorsService } from '../warriors.service';
import { JobType } from 'src/enums';
import { first } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-warrior-dialog',
  templateUrl: './new-warrior-dialog.component.html',
  styleUrls: ['./new-warrior-dialog.component.scss']
})
export class NewWarriorDialogComponent implements OnInit {

  firstname = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  lastname = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  team = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  age = new FormControl(20, [Validators.required]);
  job = new FormControl(JobType, [Validators.required]);
  // country = new FormControl({value: 'India', disabled: true});
  // married = new FormControl(true);
  
  constructor(private warriorService: WarriorsService,
    public dialogRef: MatDialogRef<NewWarriorDialogComponent>) { }

  ngOnInit() {
  }

  controlErrorMessage(control: FormControl, controlName: string) {
    return control.hasError('required') ? 'You must enter a value' :
        control.hasError(controlName) ? 'Not a valid email' :
                '';
  }

  setFirstNameValue(firstname: string) {
    this.firstname.setValue(firstname);
  }

  cancleButton(){
    this.dialogRef.close("Cancled");//close(data) can pass data back to the main page
  }




}
