import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalInfoMenuComponent } from './local-info-menu.component';

describe('LocalInfoMenuComponent', () => {
  let component: LocalInfoMenuComponent;
  let fixture: ComponentFixture<LocalInfoMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalInfoMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalInfoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
