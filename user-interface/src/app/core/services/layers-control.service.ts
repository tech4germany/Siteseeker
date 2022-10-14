import { Injectable } from '@angular/core';
import { WmsService } from './layer-services/wms.service';
import { SatelliteService } from './layer-services/satellite.service';
import { OpenStreetMapService } from './layer-services/open-street-map.service';
import { GemarkungenService } from './layer-services/gemarkungen.service';

@Injectable({
  providedIn: 'root',
})
export class LayersControlService {
  constructor(
    private wmsService: WmsService,
    private satelliteService: SatelliteService,
    private osmService: OpenStreetMapService,
    private gemarkungenService: GemarkungenService
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
      liegenschaften: boolean | null;
      nutzung: boolean | null;
      gebaeude: boolean | null;
      gemarkungen: boolean | null;
      flurstuecke: boolean | null;
      naturschutz: boolean | null;
    }>
  ) {
    // Toggle layers
    if (value.liegenschaften !== undefined && value.liegenschaften !== null)
      this.wmsService.toggleRLP_ALKIS(value.liegenschaften);
    if (value.flurstuecke !== undefined && value.flurstuecke !== null)
      this.wmsService.toggleRLP_Flurstuecke(value.flurstuecke);
    if (value.gebaeude !== undefined && value.gebaeude !== null)
      this.wmsService.toggleRLP_GebaeudeBauwerke(value.gebaeude);
    if (value.nutzung !== undefined && value.nutzung !== null)
      this.wmsService.toggleRLP_Nutzung(value.nutzung);
    if (value.gemarkungen !== undefined && value.gemarkungen !== null)
      this.gemarkungenService.toggleGemarkungenLayer(value.gemarkungen);
    if (value.naturschutz !== undefined && value.naturschutz !== null)
      this.wmsService.toggleRLP_Umwelt(value.naturschutz);
  }
}
