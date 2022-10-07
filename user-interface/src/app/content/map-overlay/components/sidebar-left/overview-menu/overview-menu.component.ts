import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../../core/services/sidebar.service';

@Component({
  selector: 'app-overview-menu',
  templateUrl: './overview-menu.component.html',
  styleUrls: ['./overview-menu.component.scss'],
})
export class OverviewMenuComponent implements OnInit {
  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {}

  public openDetail(context: string) {
    // Use context to determine which button was clicked
    this.sidebarService.toggleDetails();
  }
}
