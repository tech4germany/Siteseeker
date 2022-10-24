import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/* A service that manages the state of the sidebar in the map component */
export class SidebarService {
  /* Controls the display of the flurstueck details component. */
  showDetails: boolean = false;
  showDetails$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.showDetails
  );

  /* Controls the display of local government structure widget */
  showGovernmentStructure: boolean = false;
  showGovernmentStructure$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.showGovernmentStructure
  );

  /* Controls the display of local infrastructure widget */
  showInfrastructureInformation: boolean = false;
  showInfrastructureInformation$: BehaviorSubject<boolean> =
    new BehaviorSubject(this.showInfrastructureInformation);

  constructor() {}

  /**
   * Change Details state and emit the current value of `showDetails` to all subscribers
   */
  public toggleDetails() {
    this.showDetails = !this.showDetails;
    this.showDetails$.next(this.showDetails);
  }

  /**
   * Change government structure widget state and emit the current value of `showGovernmentStructure` to all subscribers
   */
  public toggleGovernment() {
    this.showGovernmentStructure = !this.showGovernmentStructure;
    this.showGovernmentStructure$.next(this.showGovernmentStructure);
  }

  /**
   * Change infrastructure widget state and emit the current value of `showInfrastructureInformation` to all subscribers
   */
  public toggleInfrastructure() {
    this.showInfrastructureInformation = !this.showInfrastructureInformation;
    this.showInfrastructureInformation$.next(
      this.showInfrastructureInformation
    );
  }

  /**
   * Returns a BehaviorSubject that emits the details widget current state
   * @returns BehaviorSubject<boolean>
   */
  public isDisplayDetails(): BehaviorSubject<boolean> {
    return this.showDetails$;
  }

  /**
   * Returns a BehaviorSubject that emits the government widget current state
   * @returns BehaviorSubject<boolean>
   */
  public isDisplayGovernment(): BehaviorSubject<boolean> {
    return this.showGovernmentStructure$;
  }

  /**
   * Returns a BehaviorSubject that emits the infrastructure widget current state
   * @returns BehaviorSubject<boolean>
   */
  public isDisplayInfrastructure(): BehaviorSubject<boolean> {
    return this.showInfrastructureInformation$;
  }
}
