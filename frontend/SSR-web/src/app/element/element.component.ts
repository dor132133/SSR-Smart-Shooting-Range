import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {OverlayModule} from '@angular/cdk/overlay';

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

  constructor(private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer) { 
    
  }

  ngOnInit() {
    this.iconRegistry.addSvgIcon(this.name,this.sanitizer.bypassSecurityTrustResourceUrl(this.icon));
  }
  
}
