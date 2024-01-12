import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExchangeRatesPage } from './exchange-rates.page';

describe('ExchangeRatesPage', () => {
  let component: ExchangeRatesPage;
  let fixture: ComponentFixture<ExchangeRatesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExchangeRatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
