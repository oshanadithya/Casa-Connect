import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociateMemberPage } from './associate-member.page';

describe('AssociateMemberPage', () => {
  let component: AssociateMemberPage;
  let fixture: ComponentFixture<AssociateMemberPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssociateMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
