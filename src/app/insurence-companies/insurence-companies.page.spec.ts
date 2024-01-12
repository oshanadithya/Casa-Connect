import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsurenceCompaniesPage } from './insurence-companies.page';

describe('InsurenceCompaniesPage', () => {
  let component: InsurenceCompaniesPage;
  let fixture: ComponentFixture<InsurenceCompaniesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InsurenceCompaniesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
