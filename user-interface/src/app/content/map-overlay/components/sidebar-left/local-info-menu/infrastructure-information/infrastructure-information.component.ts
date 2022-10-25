import { Component, OnInit } from '@angular/core';
import { SearchArea } from '../../../../../../core/models/config/searcharea';
import { SidebarService } from '../../../../../../core/services/utility-services/sidebar.service';
import { MapService } from '../../../../../../core/services/utility-services/map.service';

@Component({
  selector: 'app-infrastructure-information',
  templateUrl: './infrastructure-information.component.html',
  styleUrls: ['./infrastructure-information.component.scss'],
})
/**
 * Displays area based infrastructure information
 *
 * Developer Note: This is not fully implemented as we do not have access to this data yet
 * */
export class InfrastructureInformationComponent implements OnInit {
  searchArea: SearchArea;

  constructor(
    private sidebarService: SidebarService,
    private mapService: MapService
  ) {
    this.searchArea = new SearchArea([], 0);
    this.mapService.searchArea$.subscribe((searchArea: SearchArea) => {
      this.searchArea = searchArea;
    });
  }

  ngOnInit(): void {}

  public close() {
    this.sidebarService.toggleInfrastructure();
  }
}
