import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHeaderComponent } from './map-header.component';

describe('MapHeaderComponent', () => {
  let component: MapHeaderComponent;
  let fixture: ComponentFixture<MapHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
