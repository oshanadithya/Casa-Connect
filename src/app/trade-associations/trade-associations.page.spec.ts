import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeAssociationsPage } from './trade-associations.page';

describe('TradeAssociationsPage', () => {
  let component: TradeAssociationsPage;
  let fixture: ComponentFixture<TradeAssociationsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TradeAssociationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
