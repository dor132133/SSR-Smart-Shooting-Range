import { Component, OnInit, ElementRef, ViewChild, Output, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { SsrApiService } from '../ssr-api.service';
import { Session } from 'src/classes/session'
import { DataService } from '../data.service';
import { Target } from 'src/classes/target';
import { Map } from 'src/classes/map';
import { Warrior } from 'src/classes/warrior';
import { JobType } from 'src/enums';
import { Sensor } from 'src/classes/sensor';
import {OverlayModule, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { Wall } from 'src/classes/wall';

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

  constructor(private router: Router,private dataService: DataService,public overlay: Overlay,
    private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer,private api: SsrApiService){
  }

  ngOnInit() {
    this.warrior = <Warrior>this.dataService.warrior;
    this.map = <Map>this.dataService.map
    console.log(this.warrior) 
    console.log(this.map)
  }

  gogo(session){
    let wallsElements = document.querySelectorAll('.wall-element')
    let targetElements = document.querySelectorAll('.target-element')
    let sensorElements = document.querySelectorAll('.sensor-element')
    var parentPosition = document.querySelector('.border-reset').getBoundingClientRect();
    console.log('Px: ' + (parentPosition.left) + ' Py:' + (parentPosition.top))

    wallsElements.forEach(element =>{
       for(let i=0;i<this.map.walls.length;i++){
          if(this.map.walls[i].id == element.id){
            let tmpX = element.getBoundingClientRect().left
            let tmpY = element.getBoundingClientRect().top
            console.log(element.id + ':  x: ' + (tmpX) + ' y: ' + (tmpY))
            this.map.walls[i].positionY = tmpY
            //this.map.walls[i].positionX = tmpX - parentPosition.left
            break;
          } 
       }
    })

  //   targetElements.forEach(element =>{
  //     for(let i=0;i<this.map.targets.length;i++){
  //        if(this.map.targets[i].id == element.id){
  //          let tmpX = element.getBoundingClientRect().left
  //          let tmpY = element.getBoundingClientRect().top
  //          console.log('elemX: ' + tmpX  + ' , ' + 'elemY: ' + tmpY)
  //          this.map.targets[i].positionX = tmpX
  //          this.map.targets[i].positionY = tmpY
  //          break;
  //        } 
  //     }
  //  })

//    sensorElements.forEach(element =>{
//     for(let i=0;i<this.map.sensors.length;i++){
//        if(this.map.sensors[i].id == element.id){
//          let tmpX = element.getBoundingClientRect().left
//          let tmpY = element.getBoundingClientRect().top
//           console.log('elemX: ' + tmpX  + ' , ' + 'elemY: ' + tmpY)
//           this.map.sensors[i].positionX = tmpX
//           this.map.sensors[i].positionY = tmpY
//          break;
//        } 
//     }
//  })
  
  }


  start(data: JSON){
    console.log(data)
    this.api.startSession(data).subscribe(res => {
      //this.sessions = Object.values(data);
      console.log(res)
      //callback(data);
 
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

}


