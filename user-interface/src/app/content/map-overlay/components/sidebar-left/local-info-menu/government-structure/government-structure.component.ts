import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../../../core/services/sidebar.service';
import { Court } from '../../../../../../core/models/data/court';
import { SearchArea } from '../../../../../../core/models/config/searcharea';
import { MapService } from '../../../../../../core/services/map.service';

@Component({
  selector: 'app-government-structure',
  templateUrl: './government-structure.component.html',
  styleUrls: ['./government-structure.component.scss'],
})
export class GovernmentStructureComponent implements OnInit {
  court: Court | undefined = undefined;
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
    this.sidebarService.toggleGovernment();
  }
}
