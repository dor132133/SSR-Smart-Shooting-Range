import { Component, OnInit, ElementRef, ViewChild, Output, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatBottomSheet} from '@angular/material';
import { SsrApiService } from '../ssr-api.service';
import { Session } from 'src/classes/session'
import { DataService } from '../data.service';
import { Target } from 'src/classes/target';
import { Map } from 'src/classes/map';
import { Warrior } from 'src/classes/warrior';
import { JobType } from 'src/enums';
import { Sensor } from 'src/classes/sensor';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { Wall } from 'src/classes/wall';
import { MapService } from '../map.service';
import { ErrorService } from '../error.service';
import { TargetConfigureSheetComponent } from '../target-configure-sheet/target-configure-sheet.component';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  animations:[]
})
export class SessionComponent implements OnInit {

  style_flag = false;
  ICONS_PATH = 'assets/icons_elements/'
  warriorIcon = this.ICONS_PATH + 'warrior.svg';
  warriorIconName = 'warrior';
  sensorIconName = 'sensor';
  targetIconName = 'target';
  session: Object
  warrior: Warrior
  map: Map
  movedWalls: Array<HTMLElement> = []

  constructor(private router: Router,private dataService: DataService, private mapService: MapService,
    private errorService: ErrorService,private bottomSheet: MatBottomSheet,
    private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer,private api: SsrApiService){
  }

  ngOnInit() {
    this.warrior = <Warrior>this.dataService.warrior;
    this.map = JSON.parse(JSON.stringify(this.dataService.map))//copy object, instead of two pointers of one object.
    console.log(this.warrior) 
    console.log(this.map)
  }

  setMovedElement(nodeElements){
    let exist;
    for (let i = 0; nodeElements[i]; i++) {
      console.log("elemID: ",nodeElements[i].id)
      if((nodeElements[i] as HTMLElement).style.transform !== ""){//if moved
        exist = false;
        for(let j=0; this.movedWalls[j]; j++)
          if(this.movedWalls[j].id == nodeElements[i].id)//if already exist in movedArray
            exist = true;
        
        if(!exist)
          this.movedWalls.push(nodeElements[i])//in moved && not exist => push
        console.log(this.movedWalls)
      }
        
    }
    return nodeElements
  }

  test(){
    this.setMovedElement(document.querySelectorAll('.boundary-wall-element'))
    this.setMovedElement(document.querySelectorAll('.sub-boundary-wall-element'))
  }

  gogo(){
    
    this.setMovedElement(document.querySelectorAll('.boundary-wall-element'))
    this.setMovedElement(document.querySelectorAll('.sub-boundary-wall-element'))

    let targetElements = document.querySelectorAll('.target-element')
    let sensorElements = document.querySelectorAll('.sensor-element')

    var parentPosition = document.querySelector('.border-reset').getBoundingClientRect();

    this.movedWalls.forEach(element =>{
        for(let i=0;i<this.map.walls.length;i++){
          if(this.map.walls[i].id == element.id){
            let tmpX = element.getBoundingClientRect().left
            let tmpY = element.getBoundingClientRect().top
            console.log('wall' + element.id + ':  x: ' + (tmpX - parentPosition.left)+ ' y: ' + (tmpY - parentPosition.top))
            this.map.walls[i].positionX = tmpX - parentPosition.left
            this.map.walls[i].positionY = tmpY - parentPosition.top
            break;
          } 
        }
    })

    // targetElements.forEach(element =>{
    //   for(let i=0;i<this.map.targets.length;i++){
    //       if(this.map.targets[i].id == element.id){
    //         let tmpX = element.getBoundingClientRect().left
    //         let tmpY = element.getBoundingClientRect().top
    //         console.log('target' + element.id + ':  x: ' + (tmpX - parentPosition.left)+ ' y: ' + (tmpY - parentPosition.top))
    //         this.map.targets[i].positionX = tmpX - parentPosition.left
    //         this.map.targets[i].positionY = tmpY - parentPosition.top
    //         break;
    //       } 
    //   }
    // })

    // sensorElements.forEach(element =>{
    //     for(let i=0;i<this.map.sensors.length;i++){
    //       if(this.map.sensors[i].id == element.id){
    //         console.log('element.id: ',element.id)
    //         let tmpX = element.getBoundingClientRect().left
    //         let tmpY = element.getBoundingClientRect().top
    //           console.log('sensor' + element + ':  x: ' + (tmpX - parentPosition.left)+ ' y: ' + (tmpY - parentPosition.top))
    //           this.map.sensors[i].positionX = tmpX - parentPosition.left
    //           this.map.sensors[i].positionY = tmpY - parentPosition.top
    //         break;
    //       } 
    //   }
    // })
    //console.log(this.map)
    this.mapService.updateMap(<Map>this.dataService.map,this.map, (res)=>{
      if(res.status == 200){
        this.exit()
        return
      }
      this.errorService.openSnackBar('Error accoured while updating the map', 'Try again')
    })
    
  }

  start(data: JSON){
    console.log(data)
    this.api.startSession(data).subscribe(res => {
      //this.sessions = Object.values(data);
      console.log(res)
      //callback(data);
 
   })
  }

  reset(){
    this.map.walls.forEach(element =>{
      element.positionX=undefined
      element.positionY=undefined
    })
    this.map.targets.forEach(element =>{
      element.positionX=undefined
      element.positionY=undefined
    })
    this.map.sensors.forEach(element =>{
      element.positionX=undefined
      element.positionY=undefined
    })
  }

  exit(){
    this.router.navigate(['/sessions']).then( (e) => {
      if (e) {
        //console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

  openBottomSheet(chosenTarget: Target): void {
    this.dataService.sensors=this.map.sensors
    this.dataService.chosenTarget=chosenTarget
    const bottomSheetRef = this.bottomSheet.open(TargetConfigureSheetComponent);
    bottomSheetRef.afterDismissed().subscribe(() => {
      if(this.dataService.trigerBySensor !==undefined){
        chosenTarget.sernsorTrigger = (this.dataService.trigerBySensor as Sensor).id;
        let massege = 'Targer #' + chosenTarget.id + ' trigger by sensor #' + (this.dataService.trigerBySensor as Sensor).id;
        console.log(massege);
        this.errorService.openSnackBar(massege,'')
      }
      else  {
        this.errorService.openSnackBar('Target does not configure','')
        console.log('Target does not configure')
      }
    });
  }

}


