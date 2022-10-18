import { Injectable } from '@angular/core';
import { WmsService } from './layer-services/wms.service';
import { SatelliteService } from './layer-services/satellite.service';
import { OpenStreetMapService } from './layer-services/open-street-map.service';
import { GemarkungenService } from './layer-services/gemarkungen.service';
import { FlurstueckService } from './layer-services/flurstueck.service';
import {
  rlpWMS_Umwelt,
  rlpWMS_Flurstueck,
  rlpWMS_GebaeudeBauwerke,
} from './layer-services/wms.layers';

@Injectable({
  providedIn: 'root',
})
export class LayersControlService {
  constructor(
    private wmsService: WmsService,
    private satelliteService: SatelliteService,
    private osmService: OpenStreetMapService,
    private gemarkungenService: GemarkungenService,
    private flurstueckService: FlurstueckService
  ) {}

  /* -------------------- Layer Controls -------------------- */

  public baseMapControl(map: string | undefined | null) {
    switch (map) {
      case 'base':
        this.osmService.toggleOSMLayer(true);
        this.satelliteService.toggleSatelliteLayer(false);
        // TODO: Add Topo Service
        break;
      case 'satellite':
        this.osmService.toggleOSMLayer(false);
        this.satelliteService.toggleSatelliteLayer(true);
        // TODO: Add Topo Service
        break;
      case 'topo':
        this.osmService.toggleOSMLayer(false);
        this.satelliteService.toggleSatelliteLayer(false);
        // TODO: Add Topo Service
        break;

      default:
        this.osmService.toggleOSMLayer(true);
        this.satelliteService.toggleSatelliteLayer(false);
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
      this.wmsService.toggleLayer(value.flurstuecke, rlpWMS_Flurstueck);
      this.flurstueckService.toggleFlurstueckLayer(value.flurstuecke);
    }
    if (value.gebaeude !== undefined && value.gebaeude !== null)
      this.wmsService.toggleLayer(value.gebaeude, rlpWMS_GebaeudeBauwerke);
    if (value.gemarkungen !== undefined && value.gemarkungen !== null)
      this.gemarkungenService.toggleGemarkungenLayer(value.gemarkungen);
    if (value.naturschutz !== undefined && value.naturschutz !== null)
      this.wmsService.toggleLayer(value.naturschutz, rlpWMS_Umwelt);
  }
}
