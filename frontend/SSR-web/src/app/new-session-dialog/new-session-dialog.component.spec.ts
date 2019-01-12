import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSessionDialogComponent } from './new-session-dialog.component';

describe('NewSessionDialogComponent', () => {
  let component: NewSessionDialogComponent;
  let fixture: ComponentFixture<NewSessionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSessionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
