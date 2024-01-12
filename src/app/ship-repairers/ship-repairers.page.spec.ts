import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipRepairersPage } from './ship-repairers.page';

describe('ShipRepairersPage', () => {
  let component: ShipRepairersPage;
  let fixture: ComponentFixture<ShipRepairersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShipRepairersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
