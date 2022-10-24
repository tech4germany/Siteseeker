import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/utility-services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
/* Displays the header of the applications base layout */
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  /**
   * Open a new browser tab and route to the passed url
   *
   * @param url the url that should be opened in a new tab
   */
  public goToLink(url: string) {
    window.open(url, '_blank');
  }
}
