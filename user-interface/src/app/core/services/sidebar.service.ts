import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  showDetails: boolean = false;
  showDetails$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.showDetails
  );

  constructor() {}

  public toggleDetails() {
    this.showDetails = !this.showDetails;
    this.showDetails$.next(this.showDetails);
  }

  public isDisplayDetails(): BehaviorSubject<boolean> {
    return this.showDetails$;
  }
}
