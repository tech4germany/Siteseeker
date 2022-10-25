import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SidebarService } from '../../../../../core/services/utility-services/sidebar.service';
import { FlurstueckService } from '../../../../../core/services/layer-services/flurstueck.service';
import { Flurstueck } from '../../../../../core/models/data/flurstueck';
import { SearchArea } from '../../../../../core/models/config/searcharea';
import { MapService } from '../../../../../core/services/utility-services/map.service';

@Component({
  selector: 'app-overview-menu',
  templateUrl: './overview-menu.component.html',
  styleUrls: ['./overview-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewMenuComponent implements OnInit {
  searchArea: SearchArea;
  selectedFlurstuecke: Flurstueck[] = [];

  constructor(
    private sidebarService: SidebarService,
    public flurstueckService: FlurstueckService,
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

  public openDetail(context: string) {
    // Use context to determine which button was clicked
    this.sidebarService.toggleDetails();
  }
}
