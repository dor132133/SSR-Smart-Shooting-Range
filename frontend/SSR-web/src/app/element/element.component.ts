import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

  @Input() name: string
  @Input() icon: string
  @Input() positionX: string
  @Input() positionY: string
  @Input() backgroungColor: string

  constructor(private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(name,sanitizer.bypassSecurityTrustResourceUrl(this.icon));
  }

  ngOnInit() {
  }
//[ngStyle]="{'transform': 'translate(' + positionX + 'px, ' + positionY + 'px)'}"
  setPositions() {
    let styles = {
      'transform': 'translate(' + this.positionX +'px, ' + this.positionX + 'px)'
    };
    return styles;
  }

}
