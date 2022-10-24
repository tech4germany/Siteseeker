import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template:
    '<div\n' +
    '  class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">\n' +
    '  Page not found\n' +
    '</div>\n',
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
