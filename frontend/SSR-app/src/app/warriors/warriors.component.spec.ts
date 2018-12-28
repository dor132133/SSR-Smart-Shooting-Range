import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarriorsComponent } from './warriors.component';

describe('WarriorsComponent', () => {
  let component: WarriorsComponent;
  let fixture: ComponentFixture<WarriorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarriorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarriorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
