import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassificationSocietiesPage } from './classification-societies.page';

describe('ClassificationSocietiesPage', () => {
  let component: ClassificationSocietiesPage;
  let fixture: ComponentFixture<ClassificationSocietiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClassificationSocietiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
