

import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WarriorsService } from '../warriors.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Warrior } from 'src/classes/warrior';

@Component({
  selector: 'app-new-session-dialog',
  templateUrl: './new-session-dialog.component.html',
  styleUrls: ['./new-session-dialog.component.scss']
})
export class NewSessionDialogComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  myControl = new FormControl();
  title: string;
  warriors: Warrior[];
  filteredWarriors: Observable<Warrior[]>;



  constructor(private warriorsService:WarriorsService,
    public dialogRef: MatDialogRef<NewSessionDialogComponent>,
    private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) {
      this.getWarriors();
    }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ''
    });
  }

  cancleButton(){
    this.dialogRef.close("Cancled");//close(data) can pass data back to the main page
  }

  getWarriors(){
    this.warriorsService.getWarriors((data) => {
      this.warriors = Object.values(data);
      console.log(this.warriors)
      this.filteredWarriors = this.myControl.valueChanges.pipe(
        startWith(''),
        map(warrior => warrior ? this._filterWarriors(warrior) : this.warriors.slice())
      );
    })
  }

  _filterWarriors(value: string): Warrior[] {
    const filterValue = value.toLowerCase();

    return this.warriors.filter(warrior => warrior.firstname.toLowerCase().indexOf(filterValue) === 0);
  }



}
