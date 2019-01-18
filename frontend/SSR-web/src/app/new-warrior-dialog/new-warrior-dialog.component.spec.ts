import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWarriorDialogComponent } from './new-warrior-dialog.component';

describe('NewWarriorDialogComponent', () => {
  let component: NewWarriorDialogComponent;
  let fixture: ComponentFixture<NewWarriorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWarriorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWarriorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
