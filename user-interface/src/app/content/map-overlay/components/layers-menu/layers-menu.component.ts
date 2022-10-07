import { Component, OnInit } from '@angular/core';
import { MapService } from '../../../../core/services/map.service';

@Component({
  selector: 'app-layers-menu',
  templateUrl: './layers-menu.component.html',
  styleUrls: ['./layers-menu.component.scss'],
})
export class LayersMenuComponent implements OnInit {
  constructor(private mapService: MapService) {}

  ngOnInit(): void {}

  public toggleSatellite() {
    this.mapService.switchLayer();
  }
}
