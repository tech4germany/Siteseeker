import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor() {}
  /**
   * Open a new browser tab and route to the passed url
   *
   * @param url the url that should be opened in a new tab
   */
  public goToLink(url: string) {
    window.open(url, '_blank');
  }
}
