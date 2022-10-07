import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../../../../core/services/sidebar.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
})
export class LocationDetailsComponent implements OnInit {
  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {}

  public closeDetail() {
    this.sidebarService.toggleDetails();
  }
}
