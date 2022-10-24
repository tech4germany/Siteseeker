import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../core/services/utility-services/sidebar.service';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss'],
})
/* Controls the sidebar widgets via the state management in the sidebar service */
export class SidebarLeftComponent implements OnInit {
  displayDetails: boolean = false;
  displayGovernment: boolean = false;
  displayInfrastructure: boolean = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService
      .isDisplayDetails()
      .subscribe((bool: boolean) => (this.displayDetails = bool));

    this.sidebarService
      .isDisplayGovernment()
      .subscribe((bool: boolean) => (this.displayGovernment = bool));

    this.sidebarService
      .isDisplayInfrastructure()
      .subscribe((bool: boolean) => (this.displayInfrastructure = bool));
  }

  ngOnInit(): void {}
}
