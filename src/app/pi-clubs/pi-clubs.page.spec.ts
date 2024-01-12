import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PiClubsPage } from './pi-clubs.page';

describe('PiClubsPage', () => {
  let component: PiClubsPage;
  let fixture: ComponentFixture<PiClubsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PiClubsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
