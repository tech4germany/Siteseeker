import { Injectable } from '@angular/core';
import { GemarkungenService } from '../data-services/gemarkungen.service';
import { FlurstueckService } from '../layer-services/flurstueck.service';
import {
  openstreetmapLayer,
  rlpFlurstueckLayer,
  rlpGebaeudeLayer,
  rlpGemarkungenLayer,
  rlpUmweltLayer,
  satelliteLayer,
} from '../../map-layers';

import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class LayersControlService {
  constructor(
    private mapService: MapService,
    private gemarkungenService: GemarkungenService,
    private flurstueckService: FlurstueckService
  ) {}

  /* -------------------- Layer Controls -------------------- */

  public baseMapControl(map: string | undefined | null) {
    switch (map) {
      case 'base':
        this.mapService.toggleLayer(true, openstreetmapLayer);
        this.mapService.toggleLayer(false, satelliteLayer);
        // TODO: Add Topo Service
        break;
      case 'satellite':
        this.mapService.toggleLayer(false, openstreetmapLayer);
        this.mapService.toggleLayer(true, satelliteLayer);
        // TODO: Add Topo Service
        break;
      case 'topo':
        this.mapService.toggleLayer(false, openstreetmapLayer);
        this.mapService.toggleLayer(false, satelliteLayer);
        // TODO: Add Topo Service
        break;

      default:
        this.mapService.toggleLayer(true, openstreetmapLayer);
        this.mapService.toggleLayer(false, satelliteLayer);
      // TODO: Add Topo Service
    }
  }

  public extendedMapControl(
    value: Partial<{
      gebaeude: boolean | null;
      gemarkungen: boolean | null;
      flurstuecke: boolean | null;
      naturschutz: boolean | null;
    }>
  ) {
    // Toggle layers
    if (value.flurstuecke !== undefined && value.flurstuecke !== null) {
      this.mapService.toggleLayer(value.flurstuecke, rlpFlurstueckLayer);
      this.flurstueckService.toggleFlurstueckLayer(value.flurstuecke);
    }
    if (value.gebaeude !== undefined && value.gebaeude !== null)
      this.mapService.toggleLayer(value.gebaeude, rlpGebaeudeLayer);
    if (value.gemarkungen !== undefined && value.gemarkungen !== null)
      this.mapService.toggleLayer(value.gemarkungen, rlpGemarkungenLayer);
    if (value.naturschutz !== undefined && value.naturschutz !== null)
      this.mapService.toggleLayer(value.naturschutz, rlpUmweltLayer);
  }
}
