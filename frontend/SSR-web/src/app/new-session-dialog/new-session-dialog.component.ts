

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
import { Map } from 'src/classes/map';
import { MapService } from '../map.service';
import { Target } from 'src/classes/target';
import { Sensor } from 'src/classes/sensor';


@Component({
  selector: 'app-new-session-dialog',
  templateUrl: './new-session-dialog.component.html',
  styleUrls: ['./new-session-dialog.component.scss']
})
export class NewSessionDialogComponent implements OnInit {

  warriors = [];
  teams = [];
  chosenWarrior: Object
  chosenMap: Map;
  newMap = new Map('','',0,0);
  panelOpenState = false;
  ICONS_PATH = 'assets/icons_map/';
  trainIcons = [
    this.ICONS_PATH + 'city-hall.svg', this.ICONS_PATH + 'town-hall.svg',this.ICONS_PATH + 'route.svg',
    this.ICONS_PATH + 'route2.svg', this.ICONS_PATH + 'running.svg', this.ICONS_PATH + 'target.svg',
    this.ICONS_PATH + 'gun.svg'
  ]
  numbers = [1,2,3,4,5,6]
  numOfTargets: number
  numOfSensors: number
  
  constructor(private warriorsService:WarriorsService, private teamsService: TeamsService, private mapService: MapService,
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
    if(this.chosenMap==undefined)//undefined mean that the user choose to create a new map
      stepper.next();
    else{
      stepper.next();
      stepper.next();
    }
    return false
  }

  goForwardStepThree(stepper: MatStepper){
    if(this.newMap)
      stepper.next();
    return false
  }

  goBackStepThree(stepper: MatStepper){
    if(this.chosenMap==undefined)//undefined mean that the user choose to create a new map
      stepper.previous();
    else{
      stepper.previous();
      stepper.previous();
    }
    return false
  }
  
  close(){
    console.log(this.chosenWarrior)
    console.log(this.chosenMap)
    console.log(this.newMap)
    console.log(this.numOfTargets)
    console.log(this.numOfSensors)
    var data;
    if(this.chosenMap!==undefined){
      data = { warrior: this.chosenWarrior,
                  map: this.chosenMap
                }
    }
    else{
      for(let i=0; i<this.numOfTargets;i++){
        let target = new Target(i,undefined,0,0);
        this.newMap.targets.push(target)
      }
      for(let i=0; i<this.numOfSensors;i++){
        let sensor = new Sensor(i,0,0);
        this.newMap.sensors.push(sensor)
      }
      data = { warrior: this.chosenWarrior,
               map: this.newMap
      }
    }

    this.dialogRef.close(data);
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
