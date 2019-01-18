import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { SsrApiService } from '../ssr-api.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  sensors = ['01', '02', '03']
  targets = ['01', '02', '03']

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


  constructor(private router: Router,private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer,private api: SsrApiService){
    iconRegistry.addSvgIcon('wall01',sanitizer.bypassSecurityTrustResourceUrl('assets/icons_sr_components/wall01.svg'));
    iconRegistry.addSvgIcon('wall02',sanitizer.bypassSecurityTrustResourceUrl('assets/icons_sr_components/wall02.svg'));
    iconRegistry.addSvgIcon('wall03',sanitizer.bypassSecurityTrustResourceUrl('assets/icons_sr_components/wall03.svg'));
    iconRegistry.addSvgIcon('wall04',sanitizer.bypassSecurityTrustResourceUrl('assets/icons_sr_components/wall04.svg'));
    iconRegistry.addSvgIcon('wall05',sanitizer.bypassSecurityTrustResourceUrl('assets/icons_sr_components/wall05.svg'));
    iconRegistry.addSvgIcon('wall06',sanitizer.bypassSecurityTrustResourceUrl('assets/icons_sr_components/wall06.svg'));
    iconRegistry.addSvgIcon('sensor',sanitizer.bypassSecurityTrustResourceUrl('assets/icons_sr_components/sensor.svg'));
    iconRegistry.addSvgIcon('target',sanitizer.bypassSecurityTrustResourceUrl('assets/icons_sr_components/target.svg'));
    iconRegistry.addSvgIcon('warrior',sanitizer.bypassSecurityTrustResourceUrl('assets/icons_sr_components/warrior.svg'));
  }

  // addComponents(component: string){
  //   console.log('click')
  //   $(".example-boundary").append($('<div class="example-box" cdkDragBoundary=".example-boundary" cdkDrag><mat-icon svgIcon="wall01"></mat-icon></div>'))
  //   $(".example-box").scss(this.example_box_css)
  // }

  ngOnInit() {
  }

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


}
