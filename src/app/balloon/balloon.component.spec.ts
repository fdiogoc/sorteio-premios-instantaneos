import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalloonComponent } from './balloon.component';

describe('BalloonComponent', () => {
  let component: BalloonComponent;
  let fixture: ComponentFixture<BalloonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalloonComponent]
    });
    fixture = TestBed.createComponent(BalloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
