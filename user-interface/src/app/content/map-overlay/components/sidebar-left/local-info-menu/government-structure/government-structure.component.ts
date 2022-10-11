import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../../../core/services/sidebar.service';
import { GeocodingService } from '../../../../../../core/services/geocoding.service';
import { Address } from '../../../../../../core/models/Address';
import { CourtService } from '../../../../../../core/services/court.service';
import {
  Court,
  Fields,
  Geom,
  Geometry,
} from '../../../../../../core/models/Court';

@Component({
  selector: 'app-government-structure',
  templateUrl: './government-structure.component.html',
  styleUrls: ['./government-structure.component.scss'],
})
export class GovernmentStructureComponent implements OnInit {
  address: Address = new Address(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  );

  court: Court | undefined = undefined;

  constructor(
    private sidebarService: SidebarService,
    private geocodingService: GeocodingService,
    private courtService: CourtService
  ) {
    this.geocodingService.address$.subscribe((address: Address) => {
      this.address = address;
      this.court = this.courtService.findCourtByCity(address.District);
      if (this.court === undefined)
        this.court = this.courtService.findCourtByCity(address.City);
      if (this.court === undefined)
        this.court = this.courtService.findCourtByCity(address.Subregion);
    });
  }

  ngOnInit(): void {}

  public closeGovernment() {
    this.sidebarService.toggleGovernment();
  }
}
