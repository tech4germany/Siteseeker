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

  /**
   * This function takes the desired state of the base map as an argument and
   * toggles the base map layers on and off based on the string value.
   *
   * Developer Note: This is ugly, would be nicer with enum or something more generic
   *
   * @param {string | undefined | null} map - string | undefined | null
   */
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

  /**
   * Toggles the visibility of the layers in the map taht can be layered on to of each other (not the base maps)
   * @param value - boolean values that specify the visibility state of the individual layers
   */
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
