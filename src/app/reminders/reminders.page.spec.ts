import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemindersPage } from './reminders.page';

describe('RemindersPage', () => {
  let component: RemindersPage;
  let fixture: ComponentFixture<RemindersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RemindersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
