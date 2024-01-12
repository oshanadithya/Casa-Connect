import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipSupliersPage } from './ship-supliers.page';

describe('ShipSupliersPage', () => {
  let component: ShipSupliersPage;
  let fixture: ComponentFixture<ShipSupliersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShipSupliersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
