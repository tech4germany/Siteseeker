import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentStructureComponent } from './government-structure.component';

describe('GovernmentStructureComponent', () => {
  let component: GovernmentStructureComponent;
  let fixture: ComponentFixture<GovernmentStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovernmentStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
