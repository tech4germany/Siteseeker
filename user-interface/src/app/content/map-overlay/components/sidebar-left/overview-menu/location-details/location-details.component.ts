import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../../../core/services/sidebar.service';
import { Flurstueck } from '../../../../../../core/models/data/flurstueck';
import { SearchArea } from '../../../../../../core/models/config/searcharea';
import { FlurstueckService } from '../../../../../../core/services/layer-services/flurstueck.service';
import { MapService } from '../../../../../../core/services/map.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
})
export class LocationDetailsComponent implements OnInit {
  selectedFlurstuecke: Flurstueck[] = [];
  searchArea: SearchArea;

  constructor(
    private sidebarService: SidebarService,
    private flurstueckService: FlurstueckService,
    private mapService: MapService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.searchArea = new SearchArea([], 0);
    this.mapService.searchArea$.subscribe((searchArea: SearchArea) => {
      this.searchArea = searchArea;
    });
  }

  ngOnInit(): void {
    this.flurstueckService.selectedFlurstuecke$.subscribe(flurstuecke => {
      this.selectedFlurstuecke = flurstuecke;
      this.changeDetectorRef.detectChanges();
    });
  }

  public closeDetail() {
    this.sidebarService.toggleDetails();
  }
}
