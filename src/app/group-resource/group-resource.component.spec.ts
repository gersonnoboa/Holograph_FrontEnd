import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupResourceComponent } from './group-resource.component';

describe('GroupResourceComponent', () => {
  let component: GroupResourceComponent;
  let fixture: ComponentFixture<GroupResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
