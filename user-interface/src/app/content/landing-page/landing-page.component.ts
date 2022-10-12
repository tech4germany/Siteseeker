import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MapService } from '../../core/services/map.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  coordinateForm: FormGroup = new FormGroup({
    longitude: new FormControl(null, [
      Validators.required,
      Validators.min(-180),
      Validators.max(180),
      Validators.pattern('[0-9]+.[0-9]+'),
    ]),
    latitude: new FormControl(null, [
      Validators.required,
      Validators.min(-90),
      Validators.max(90),
      Validators.pattern('[0-9]+.[0-9]+'),
    ]),
    radius: new FormControl(null, [
      Validators.required,
      Validators.min(1),
1000      Validators.max(1000),
      Validators.pattern('[0-9]+'),
    ]),
  });

  constructor(private mapService: MapService, private router: Router) {}

  ngOnInit(): void {}

  get longitude(): AbstractControl | null {
    return this.coordinateForm.get('longitude');
  }

  get latitude(): AbstractControl | null {
    return this.coordinateForm.get('latitude');
  }

  get radius(): AbstractControl | null {
    return this.coordinateForm.get('radius');
  }

  onSubmit() {
    this.mapService.setCoordinate(
      this.coordinateForm.get('longitude')?.value,
      this.coordinateForm.get('latitude')?.value
    );
    this.mapService.setRadius(this.coordinateForm.get('radius')?.value);
    this.router.navigateByUrl('/userspace/map');
  }
}
