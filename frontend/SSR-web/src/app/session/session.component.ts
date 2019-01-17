import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  SSRComponents = [
    'wall01', 'wall02', 'wall03', 'wall04', 'wall05', 'wall06', 'sensor', 'warrior', 'target' 
  ]

  example_box_css = { 
      "width": "100px",
      "height": "100px",
      "border": "solid 1px #ccc",
      "color": "rgba(0, 0, 0, 0.87)",
      "cursor": "move",
      "display": "inline-flex",
      "justify-content": "center",
      "align-items": "center",
      "text-align": "center",
      "background": "#fff",
      "border-radius": "4px",
      "margin-right":" 25px",
      "position": "relative",
      "z-index": "1",
      "box-sizing":" border-box",
      "padding": "10px",
      "transition": "box-shadow 200ms cubic-bezier(0, 0, 0.2, 1)",
      "box-shadow":" 0 3px 1px -2px rgba(0, 0, 0, 0.2),0 2px 2px 0 rgba(0, 0, 0, 0.14),0 1px 5px 0 rgba(0, 0, 0, 0.12)"}


  constructor(private router: Router,private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer){
    iconRegistry.addSvgIcon('wall01',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wall01.svg'));
    iconRegistry.addSvgIcon('wall02',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wall02.svg'));
    iconRegistry.addSvgIcon('wall03',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wall03.svg'));
    iconRegistry.addSvgIcon('wall04',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wall04.svg'));
    iconRegistry.addSvgIcon('wall05',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wall05.svg'));
    iconRegistry.addSvgIcon('wall06',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/wall06.svg'));
    iconRegistry.addSvgIcon('sensor',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sensor.svg'));
    iconRegistry.addSvgIcon('target',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/target.svg'));
    iconRegistry.addSvgIcon('warrior',sanitizer.bypassSecurityTrustResourceUrl('assets/icons/warrior.svg'));
  }

  addComponents(component: string){
    console.log('click')
    $(".example-boundary").append($('<div class="example-box" cdkDragBoundary=".example-boundary" cdkDrag><mat-icon svgIcon="wall01"></mat-icon></div>'))
    $(".example-box").scss(this.example_box_css)
  }

  ngOnInit() {
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
