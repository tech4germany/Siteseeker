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
/**
 * A component that is used to display an overlay on map, displaying all the controls and custom UI elements
 */
export class MapOverlayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
