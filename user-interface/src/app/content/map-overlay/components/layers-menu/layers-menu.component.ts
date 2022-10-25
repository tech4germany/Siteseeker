import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapService } from 'src/app/core/services/utility-services/map.service';
import { LayersControlService } from '../../../../core/services/utility-services/layers-control.service';

@Component({
  selector: 'app-layers-menu',
  templateUrl: './layers-menu.component.html',
  styleUrls: ['./layers-menu.component.scss'],
})
/**
 * A component that controls the visibility of the map layers
 */
export class LayersMenuComponent implements OnInit {
  isMenuOpen: boolean = false;

  baseMapControl = new FormGroup({
    map: new FormControl('base'),
  });

  extendedMapControl = new FormGroup({
    gebaeude: new FormControl(false),
    gemarkungen: new FormControl(false),
    flurstuecke: new FormControl(false),
    naturschutz: new FormControl(false),
  });

  constructor(private layersControlService: LayersControlService) {}

  /**
   * Propagates layer settings to layers via the layer control service
   * and persists current layer settings (only the checkboxes) in local storage
   */
  ngOnInit(): void {
    // Restore selected maps settings
    const storedMapControls = JSON.parse(
      localStorage.getItem('extendedMapControl')!
    );
    if (storedMapControls) {
      this.layersControlService.extendedMapControl(storedMapControls);
      this.extendedMapControl.setValue(storedMapControls);
    }

    this.baseMapControl.statusChanges.subscribe(() => {
      this.layersControlService.baseMapControl(this.baseMapControl.value.map);
    });

    this.extendedMapControl.statusChanges.subscribe(() => {
      this.layersControlService.extendedMapControl(
        this.extendedMapControl.value
      );
      // Save state to local storage
      localStorage.setItem(
        'extendedMapControl',
        JSON.stringify(this.extendedMapControl.value)
      );
    });
  }

  public toggleLayersButton() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
