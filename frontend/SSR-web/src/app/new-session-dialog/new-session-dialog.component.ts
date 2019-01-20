

import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WarriorsService } from '../warriors.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Warrior } from 'src/classes/warrior';
import { Team } from 'src/classes/team';
import { TeamsService } from '../teams.service';
import { MatStepper } from '@angular/material/stepper';
import {TrainType} from "src/enums"


@Component({
  selector: 'app-new-session-dialog',
  templateUrl: './new-session-dialog.component.html',
  styleUrls: ['./new-session-dialog.component.scss']
})
export class NewSessionDialogComponent implements OnInit {


  title: string;
  warriors = [];
  teams = [];
  chosenWarrior: Object
  chosenMap: Object;
  panelOpenState = false;
  chosenTrainType = Object

  constructor(private warriorsService:WarriorsService, private teamsService: TeamsService,
    public dialogRef: MatDialogRef<NewSessionDialogComponent>,
    private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit() {
    this.getData()
    // this.getWarriors();
    // this.getTeams();
  }

  goForwardStepOne(stepper: MatStepper){
    if(this.chosenWarrior)
      stepper.next();
    return false
  }
  goForwardStepTwo(stepper: MatStepper){
    if(this.chosenMap)
      stepper.next();
    return false
  }

  close(){
    console.log(this.chosenWarrior)
    console.log(this.chosenMap)
    this.dialogRef.close("Cancled");//close(data) can pass data back to the main page
  }

  getData(){
    this.warriorsService.getWarriors((dataA) => {
      this.warriors = Object.values(dataA).filter(function(element){
        return element['empty']==undefined
      })
      //console.log(this.warriors)
      this.teamsService.getTeams((dataB) => {
        this.teams = Object.values(dataB).filter(function(element){
          return element['empty']==undefined
        })
        for(var i=0; i<this.warriors.length; i++)
          for(var j=0;j<this.teams.length; j++)
            if(this.warriors[i].team == this.teams[j].name)
              this.warriors[i].teamPic=this.teams[j].pic
      })
    })
  }

  getWarriors(){
    this.warriorsService.getWarriors((data) => {
      this.warriors = Object.values(data).filter(function(element){
        return element['empty']==undefined
      })
      //console.log(this.warriors)
    })
  }

  getTeams(){
    this.teamsService.getTeams((data) => {
      this.teams = Object.values(data).filter(function(element){
        return element['empty']==undefined
      })
      //console.log(this.teams)
    })
  }





}
