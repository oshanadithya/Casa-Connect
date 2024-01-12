import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtpPgPage } from './otp-pg.page';

describe('OtpPgPage', () => {
  let component: OtpPgPage;
  let fixture: ComponentFixture<OtpPgPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OtpPgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
