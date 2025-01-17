import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterInvitesComponent } from './consulter-invites.component';

describe('ConsulterInvitesComponent', () => {
  let component: ConsulterInvitesComponent;
  let fixture: ComponentFixture<ConsulterInvitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsulterInvitesComponent]
    });
    fixture = TestBed.createComponent(ConsulterInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
