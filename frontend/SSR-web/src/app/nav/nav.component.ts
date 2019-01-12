import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  appTitle = 'Smart Shooting Range'
  navLinks: any[];
  activeLinkIndex = -1;
 
  constructor(private router: Router) {
    this.navLinks = [
        {
            label: 'Home',
            link: './home',
            index: 0
        }, {
            label: 'Sessions',
            link: './sessions',
            index: 1
        }, {
            label: 'Collections',
            link: './collections',
            index: 2
        }, 
    ];
}
ngOnInit(): void {
  this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
}
}
