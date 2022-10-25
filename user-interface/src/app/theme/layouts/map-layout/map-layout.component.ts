import { Component } from '@angular/core';

@Component({
  selector: 'app-map-layout',
  template:
    '<app-map-header></app-map-header>\n' + '<router-outlet></router-outlet>',
})
/* The MapLayoutComponent is a layout component used in dynamic routing to render the app shell for the map routes */
export class MapLayoutComponent {
  constructor() {}
}
