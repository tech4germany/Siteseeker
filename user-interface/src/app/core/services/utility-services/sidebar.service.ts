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
  showGovernmentStructure: boolean = false;
  showGovernmentStructure$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.showGovernmentStructure
  );

  showInfrastructureInformation: boolean = false;
  showInfrastructureInformation$: BehaviorSubject<boolean> =
    new BehaviorSubject(this.showInfrastructureInformation);

  constructor() {}

  public toggleDetails() {
    this.showDetails = !this.showDetails;
    this.showDetails$.next(this.showDetails);
  }

  public toggleGovernment() {
    this.showGovernmentStructure = !this.showGovernmentStructure;
    this.showGovernmentStructure$.next(this.showGovernmentStructure);
  }

  public toggleInfrastructure() {
    this.showInfrastructureInformation = !this.showInfrastructureInformation;
    this.showInfrastructureInformation$.next(
      this.showInfrastructureInformation
    );
  }

  public isDisplayDetails(): BehaviorSubject<boolean> {
    return this.showDetails$;
  }

  public isDisplayGovernment(): BehaviorSubject<boolean> {
    return this.showGovernmentStructure$;
  }

  public isDisplayInfrastructure(): BehaviorSubject<boolean> {
    return this.showInfrastructureInformation$;
  }
}
