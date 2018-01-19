import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTimeComponent } from './active-time.component';

describe('ActiveTimeComponent', () => {
  let component: ActiveTimeComponent;
  let fixture: ComponentFixture<ActiveTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
