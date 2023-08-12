import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleOwnersComponent } from './companies.component';

describe('VehicleOwnersComponent', () => {
  let component: VehicleOwnersComponent;
  let fixture: ComponentFixture<VehicleOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleOwnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
