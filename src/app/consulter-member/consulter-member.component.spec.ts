import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterMemberComponent } from './consulter-member.component';

describe('ConsulterMemberComponent', () => {
  let component: ConsulterMemberComponent;
  let fixture: ComponentFixture<ConsulterMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsulterMemberComponent]
    });
    fixture = TestBed.createComponent(ConsulterMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
