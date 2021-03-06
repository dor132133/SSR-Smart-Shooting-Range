import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { WarriorsService } from '../warriors.service';
import { JobType } from 'src/enums';
import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Warrior } from 'src/classes/warrior';
import { TeamsService } from '../teams.service';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-new-warrior-dialog',
  templateUrl: './new-warrior-dialog.component.html',
  styleUrls: ['./new-warrior-dialog.component.scss']
})
export class NewWarriorDialogComponent implements OnInit {

  areaNumbers = ['02','03','04','08','050','052','053','054','057','058']
  newWarrior = new Warrior('','',null,'','assets/icons_general/target3.svg',null,'');
  teams = []
  jobType = [JobType.GUEST, JobType.GUID, JobType.OTHER]
  myAreaPhoneNumber = ''
  myPhoneNumber = ''


  constructor(private warriorService: WarriorsService,@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewWarriorDialogComponent>, private teamsService: TeamsService,private errorService: ErrorService) { }

  ngOnInit() {
    this.getTeams();
  }

  checkFields(){
    if(this.myPhoneNumber.toString().length !== 7){this.errorService.openSnackBar('Wrong Phone Number','Error')
      return false}
    if(this.myAreaPhoneNumber.toString().length <= 0){this.errorService.openSnackBar('Wrong Area Phone Number','Error')
      return false}
    if(this.newWarrior.firstname.replace(' ','') == ''){this.errorService.openSnackBar('Enter First Name','Error')
     return false}
    if(this.newWarrior.lastname.replace(' ','') == ''){this.errorService.openSnackBar('Enter Last Name','Error')
    return false}
    if(this.newWarrior.age <= 0){this.errorService.openSnackBar('Wrong Age','Error')
    return false}
    if(this.newWarrior.team == ''){this.errorService.openSnackBar('Choose Team','Error')
    return false}
    if(this.newWarrior.job == null){this.errorService.openSnackBar('Choose Job','Error')
    return false}
    return true
  }

  AddNewWarrior(){
    if(this.checkFields()){
      this.newWarrior.phone = this.myAreaPhoneNumber.toString() +'-'+ this.myPhoneNumber.toString();
      this.data = this.newWarrior
      this.dialogRef.close(this.data);//close(data) can pass data back to the main page
    }
  }

  cancleButton(){
    this.dialogRef.close(false);//close(data) can pass data back to the main page
  }

  getTeams(){
    this.teamsService.getTeams((data) => {
      this.teams = Object.values(data);
      //console.log(this.teams)
    })
  }



}
