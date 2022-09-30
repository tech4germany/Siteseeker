import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'user-interface';

  constructor(public router: Router) {}

  public navigate() {
    this.router.navigateByUrl('');
  }
}
