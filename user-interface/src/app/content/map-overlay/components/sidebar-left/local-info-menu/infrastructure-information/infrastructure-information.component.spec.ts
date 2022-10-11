import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureInformationComponent } from './infrastructure-information.component';

describe('InfrastructureInformationComponent', () => {
  let component: InfrastructureInformationComponent;
  let fixture: ComponentFixture<InfrastructureInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfrastructureInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfrastructureInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
