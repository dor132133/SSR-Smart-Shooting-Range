import { Component, OnInit, ElementRef, ViewChild, Output } from '@angular/core';
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
import * as $ from 'jquery';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  animations:[]
})
export class SessionComponent implements OnInit {

  @Output() iconElement: string
  @Output() positionXElement: string
  @Output() positionYElement: string


  ICONS_PATH = 'assets/icons_sr_components/'
  session: Object
  warrior = new Warrior('Dor', 'Ben Yehuda', 26, 'UDI','',JobType.GUID,'052-3804878') //id: "5c436e457013cf0027667ac1"
  map = new Map('Lotar01','assets/icons_map/town-hall.svg',0,0); //id: "5c47534d11eac30022666f8c"
  walls = [
           {name: 'wall01',icon: this.ICONS_PATH + 'wall01.svg', positionX: '300px', positionY: '500px'},
          //  {name: 'wall02',icon: this.ICONS_PATH + 'wall02.svg', positionX: '50px', positionY: '50px'},
          //  {name: 'wall03',icon: this.ICONS_PATH + 'wall03.svg', positionX: '50px', positionY: '50px'},
          ]

  constructor(private router: Router,private dataService: DataService,
    private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer,private api: SsrApiService){
  }

  ngOnInit() {
    this.map.sensors.push(new Sensor(0,0,0))
    this.map.sensors.push(new Sensor(1,0,0))
    this.map.targets.push(new Target(0,0,0,0))
    this.map.targets.push(new Target(1,1,0,0))
    this.initElementsIcons()
    // this.warrior = this.dataService.warrior;
    // this.map = this.dataService.map
    console.log(this.warrior) 
    console.log(this.map)
  }


  gogo(){
    // $('.warriorElement').css("background-image", "url(assets/icons_sr_components/warrior.svg)")
    $(".warriorElement").animate({
      left: '200px'
    }, 'slow');
    //$('.warriorElement').style({ opacity: 0, transform: 'rotateX(-90deg) translateY(150px) translateZ(50px)' })
    console.log('warrior: ', $(".warriorElement").translate3d(0, 0, ''))
  }

  // addComponents(component: string){
  //   console.log('click')
  //   $(".example-boundary").append($('<div class="example-box" cdkDragBoundary=".example-boundary" cdkDrag><mat-icon svgIcon="wall01"></mat-icon></div>'))
  //   $(".example-box").scss(this.example_box_css)
  // }


  start(data: JSON){
    console.log(data)
    this.api.startSession(data).subscribe(res => {
      //this.sessions = Object.values(data);
      console.log(res)
      //callback(data);
 
      // var controller = angular.module('SessionComponent', []);
      // module.controller('TimeCtrl', function($scope, $interval) {
      //   var tick = function() {
      //     $scope.clock = Date.now();
      //   }
      //   tick();
      //   $interval(tick, 1000);
      // });
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

  initElementsIcons(){
    this.iconRegistry.addSvgIcon('wall01',this.sanitizer.bypassSecurityTrustResourceUrl(this.ICONS_PATH + 'wall01.svg'));
    this.iconRegistry.addSvgIcon('wall02',this.sanitizer.bypassSecurityTrustResourceUrl(this.ICONS_PATH + 'wall02.svg'));
    this.iconRegistry.addSvgIcon('wall03',this.sanitizer.bypassSecurityTrustResourceUrl(this.ICONS_PATH + 'wall03.svg'));
    this.iconRegistry.addSvgIcon('wall04',this.sanitizer.bypassSecurityTrustResourceUrl(this.ICONS_PATH + 'wall04.svg'));
    this.iconRegistry.addSvgIcon('wall05',this.sanitizer.bypassSecurityTrustResourceUrl(this.ICONS_PATH + 'wall05.svg'));
    this.iconRegistry.addSvgIcon('wall06',this.sanitizer.bypassSecurityTrustResourceUrl(this.ICONS_PATH + 'wall06.svg'));
    this.iconRegistry.addSvgIcon('sensor',this.sanitizer.bypassSecurityTrustResourceUrl(this.ICONS_PATH + 'sensor.svg'));
    this.iconRegistry.addSvgIcon('target',this.sanitizer.bypassSecurityTrustResourceUrl(this.ICONS_PATH + 'target.svg'));
    this.iconRegistry.addSvgIcon('warrior',this.sanitizer.bypassSecurityTrustResourceUrl(this.ICONS_PATH + 'warrior.svg'));
  }

}



  // example_box_css = { 
  //     "width": "50px",
  //     "height": "50px",
  //     "border": "solid 1px #ccc",
  //     "color": "rgba(0, 0, 0, 0.87)",
  //     "cursor": "move",
  //     "display": "inline-flex",
  //     "justify-content": "center",
  //     "align-items": "center",
  //     "text-align": "center",
  //     "background": "#fff",
  //     "border-radius": "4px",
  //     "margin-right":" 25px",
  //     "position": "relative",
  //     "z-index": "1",
  //     "box-sizing":" border-box",
  //     "padding": "10px",
  //     "transition": "box-shadow 200ms cubic-bezier(0, 0, 0.2, 1)",
  //     "box-shadow":" 0 3px 1px -2px rgba(0, 0, 0, 0.2),0 2px 2px 0 rgba(0, 0, 0, 0.14),0 1px 5px 0 rgba(0, 0, 0, 0.12)"}
