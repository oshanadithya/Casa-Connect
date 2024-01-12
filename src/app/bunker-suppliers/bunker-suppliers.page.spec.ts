import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BunkerSuppliersPage } from './bunker-suppliers.page';

describe('BunkerSuppliersPage', () => {
  let component: BunkerSuppliersPage;
  let fixture: ComponentFixture<BunkerSuppliersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BunkerSuppliersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
