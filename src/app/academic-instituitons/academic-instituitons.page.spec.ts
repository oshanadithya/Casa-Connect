import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcademicInstituitonsPage } from './academic-instituitons.page';

describe('AcademicInstituitonsPage', () => {
  let component: AcademicInstituitonsPage;
  let fixture: ComponentFixture<AcademicInstituitonsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AcademicInstituitonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
