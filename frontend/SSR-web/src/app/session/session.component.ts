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
  session: Object
  warrior = new Warrior('Dor', 'Ben Yehuda', 26, 'UDI','',JobType.GUID,'052-3804878') //id: "5c436e457013cf0027667ac1"
  map = new Map('Lotar01','assets/icons_map/town-hall.svg',0,0); //id: "5c47534d11eac30022666f8c"
  walls = [
    new Wall('00','wall00',this.ICONS_PATH + 'wall00.svg', undefined,undefined),
    new Wall('00','wall00',this.ICONS_PATH + 'wall00.svg', '200px','200px'),
    new Wall('01','wall01',this.ICONS_PATH + 'wall01.svg', undefined,undefined),
    new Wall('01','wall01',this.ICONS_PATH + 'wall01.svg', undefined,undefined),
    new Wall('02','wall02',this.ICONS_PATH + 'wall02.svg', undefined,undefined),
    new Wall('02','wall02',this.ICONS_PATH + 'wall02.svg', undefined,undefined),
    new Wall('03','wall03',this.ICONS_PATH + 'wall03.svg', undefined,undefined),
    new Wall('03','wall03',this.ICONS_PATH + 'wall03.svg', undefined,undefined),
    new Wall('04','wall04',this.ICONS_PATH + 'wall04.svg', undefined,undefined),
    new Wall('04','wall04',this.ICONS_PATH + 'wall04.svg', undefined,undefined),
    new Wall('05','wall05',this.ICONS_PATH + 'wall05.svg', undefined,undefined),
    new Wall('05','wall05',this.ICONS_PATH + 'wall05.svg', undefined,undefined)
          ]
  
  constructor(private router: Router,private dataService: DataService,public overlay: Overlay,
    private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer,private api: SsrApiService){
  }

  ngOnInit() {
    // this.warrior = this.dataService.warrior;
    // this.map = this.dataService.map
    this.map.walls = this.walls
    for(let i=0;i<2;i++){
      let sensor = new Sensor(i,0,0)
      sensor.icon = this.ICONS_PATH + 'sensor.svg'
      sensor.name = 'sensor'
      this.map.sensors.push(sensor)
      let target = new Target(i,i,0,0)
      target.icon = this.ICONS_PATH + 'target.svg'
      target.name = 'target'
      this.map.targets.push(target)
    }
    this.warrior.icon = this.ICONS_PATH + 'warrior.svg';
    console.log(this.warrior) 
    console.log(this.map)
  }


  gogo(session){

    let elements = document.querySelectorAll('.app-element')
    console.log(this.walls)

    // var elementPosition = document.querySelector('.app-element').getBoundingClientRect()
    //var parentPosition = document.querySelector('.border-reset').getBoundingClientRect()
    //var parent = document.querySelector('.border-reset')
    
    // console.log(elementPosition)
    // console.log(parentPosition)

    // let positionX = elementPosition.left - parentPosition.left
    // let positionY = elementPosition.top - parentPosition.top

    // console.log(positionX)
    // console.log(positionY)
   // console.log(parent.getBoundingClientRect())
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


