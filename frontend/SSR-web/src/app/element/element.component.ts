import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import {OverlayModule} from '@angular/cdk/overlay';
import { identifierModuleUrl } from '@angular/compiler';
import { DataService } from '../data.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

  @Input() name: string
  @Input() icon: string
  @Input() elemId: string
  @Input() sernsorTrigger: number

  constructor(private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer, private dataService: DataService) { 
    
  }

  ngOnInit() {
    
    this.iconRegistry.addSvgIcon(this.name,this.sanitizer.bypassSecurityTrustResourceUrl(this.icon));
    if(this.name !=='target' && this.name !== 'sensor')
      this.elemId = ''
  }
  
}
