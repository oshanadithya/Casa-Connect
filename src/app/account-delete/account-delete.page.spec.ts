import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountDeletePage } from './account-delete.page';

describe('AccountDeletePage', () => {
  let component: AccountDeletePage;
  let fixture: ComponentFixture<AccountDeletePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AccountDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
