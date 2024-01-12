import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IcTPage } from './ic-t.page';

describe('IcTPage', () => {
  let component: IcTPage;
  let fixture: ComponentFixture<IcTPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IcTPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
