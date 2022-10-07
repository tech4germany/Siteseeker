import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss'],
})
export class SidebarLeftComponent implements OnInit {
  displayDetails: boolean = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService
      .isDisplayDetails()
      .subscribe((bool: boolean) => (this.displayDetails = bool));
  }

  ngOnInit(): void {}
}
