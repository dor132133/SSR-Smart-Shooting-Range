

import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WarriorsService } from '../warriors.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Warrior } from 'src/classes/warrior';
export interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-new-session-dialog',
  templateUrl: './new-session-dialog.component.html',
  styleUrls: ['./new-session-dialog.component.scss']
})
export class NewSessionDialogComponent implements OnInit {

 
  //myControl = new FormControl('', [Validators.required]);
  animalControl = new FormControl('', [Validators.required]);
  title: string;
  warriors: Warrior[];

  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];







  // filteredWarriors: Observable<Warrior[]>;
 // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  // isOptional = true;


  constructor(private warriorsService:WarriorsService,
    public dialogRef: MatDialogRef<NewSessionDialogComponent>,
    private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) {
      this.getWarriors();
    }

  ngOnInit() {
    // this.firstFormGroup = this.formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this.formBuilder.group({
    //   secondCtrl: ''
    // });
  }
  //   this.filteredWarriors = this.myControl.valueChanges.pipe(
  //     startWith<string | Warrior>(''),
  //     map(value => typeof value === 'string' ? value : value.firstname),
  //     map(name => name ? this._filter(name) : this.warriors.slice())
  //   );
  // }
  // private _filter(name: string): Warrior[] {
  //   const filterValue = name.toLowerCase();
  //   return this.warriors.filter(option => option.firstname.toLowerCase().indexOf(filterValue) === 0);
  // }

  // displayFn(warrior ? : Warrior): string | undefined {
  //   return warrior ? warrior.firstname : undefined;
  // }

  cancleButton(){
    this.dialogRef.close("Cancled");//close(data) can pass data back to the main page
  }

  getWarriors(){
    this.warriorsService.getWarriors((data) => {
      this.warriors = Object.values(data);
      //console.log(this.warriors)
    })
  }





}
