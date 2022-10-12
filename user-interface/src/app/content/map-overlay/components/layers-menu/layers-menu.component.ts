import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapService } from 'src/app/core/services/map.service';

@Component({
  selector: 'app-layers-menu',
  templateUrl: './layers-menu.component.html',
  styleUrls: ['./layers-menu.component.scss'],
})
export class LayersMenuComponent implements OnInit {
  isMenuOpen: boolean = false;

  baseMapControl = new FormGroup({
    map: new FormControl('base'),
  });

  extendedMapControl = new FormGroup({
    liegenschaften: new FormControl(false),
    nutzung: new FormControl(false),
    gebaeude: new FormControl(false),
    lagebezeichnung: new FormControl(false),
    flurstuecke: new FormControl(false),
    naturschutz: new FormControl(false),
  });

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.baseMapControl.statusChanges.subscribe(() => {
      this.mapService.baseMapControl(this.baseMapControl.value.map);
    });

    this.extendedMapControl.statusChanges.subscribe(() => {
      this.mapService.extendedMapControl(this.extendedMapControl.value);
    });
  }

  public toggleLayersButton() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
