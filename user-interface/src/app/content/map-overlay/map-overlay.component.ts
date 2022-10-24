import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-overlay',
  template:
    '<router-outlet></router-outlet>\n' +
    '\n' +
    '<app-sidebar-left></app-sidebar-left>\n' +
    '\n' +
    '<app-layers-menu></app-layers-menu>\n' +
    '\n' +
    '<app-data-basket></app-data-basket>\n',
})
export class MapOverlayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
