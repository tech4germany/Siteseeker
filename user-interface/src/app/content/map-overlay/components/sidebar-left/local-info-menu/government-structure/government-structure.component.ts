import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../../../core/services/sidebar.service';
import { GeocodingService } from '../../../../../../core/services/geocoding.service';
import { Address } from '../../../../../../core/models/address';
import { CourtService } from '../../../../../../core/services/court.service';
import {
  Court,
  Fields,
  Geom,
  Geometry,
} from '../../../../../../core/models/court';
import { SearchArea } from '../../../../../../core/models/searcharea';
import { MapService } from '../../../../../../core/services/map.service';
import { MapConfig } from '../../../../../../core/models/mapconfig';
import View from 'ol/View';
import Feature from 'ol/Feature';
import { GeoJSON } from 'ol/format';

@Component({
  selector: 'app-government-structure',
  templateUrl: './government-structure.component.html',
  styleUrls: ['./government-structure.component.scss'],
})
export class GovernmentStructureComponent implements OnInit {
  court: Court | undefined = undefined;
  searchArea: SearchArea;
  gemarkungen: Feature[] = [];

  constructor(
    private sidebarService: SidebarService,
    private mapService: MapService,
    private courtService: CourtService
  ) {
    this.searchArea = new SearchArea([], 0);
    this.mapService.searchArea$.subscribe((searchArea: SearchArea) => {
      this.searchArea = searchArea;
      this.gemarkungen = new GeoJSON().readFeatures(
        searchArea.getGemarkungen()
      );
    });
  }

  ngOnInit(): void {}

  public closeGovernment() {
    this.sidebarService.toggleGovernment();
  }
}
