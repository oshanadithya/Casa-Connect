import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaritimeLawyersPage } from './maritime-lawyers.page';

describe('MaritimeLawyersPage', () => {
  let component: MaritimeLawyersPage;
  let fixture: ComponentFixture<MaritimeLawyersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MaritimeLawyersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
