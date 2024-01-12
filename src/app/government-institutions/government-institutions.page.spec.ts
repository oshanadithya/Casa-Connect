import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GovernmentInstitutionsPage } from './government-institutions.page';

describe('GovernmentInstitutionsPage', () => {
  let component: GovernmentInstitutionsPage;
  let fixture: ComponentFixture<GovernmentInstitutionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GovernmentInstitutionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
