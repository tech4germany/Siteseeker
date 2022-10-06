import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  longitude$: BehaviorSubject<number> = new BehaviorSubject<number>(
    13.40940990769482
  );
  latitude$: BehaviorSubject<number> = new BehaviorSubject<number>(
    52.520831598904365
  );
  radius$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor() {}

  public setLatitude(latitude: number) {
    this.latitude$.next(latitude);
  }

  public setLongitude(longitude: number) {
    this.longitude$.next(longitude);
  }

  public setRadius(radius: number) {
    this.radius$.next(radius);
  }

  public getLongitude(): BehaviorSubject<number> {
    return this.longitude$;
  }

  public getLatitude(): BehaviorSubject<number> {
    return this.latitude$;
  }

  public getRadius(): BehaviorSubject<number> {
    return this.radius$;
  }
}
