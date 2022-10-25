import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../../core/services/utility-services/sidebar.service';

@Component({
  selector: 'app-local-info-menu',
  templateUrl: './local-info-menu.component.html',
  styleUrls: ['./local-info-menu.component.scss'],
})
/**
 * The sidebar menu which holds the local area context information */
export class LocalInfoMenuComponent implements OnInit {
  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {}

  public openDetail(context: string) {
    // Use context to determine which button was clicked
    if (context === 'government') this.sidebarService.toggleGovernment();
    else this.sidebarService.toggleInfrastructure();
  }
}
