import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterMemberComponent } from './affecter-member.component';

describe('AffecterMemberComponent', () => {
  let component: AffecterMemberComponent;
  let fixture: ComponentFixture<AffecterMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffecterMemberComponent]
    });
    fixture = TestBed.createComponent(AffecterMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
