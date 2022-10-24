import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/utility-services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
