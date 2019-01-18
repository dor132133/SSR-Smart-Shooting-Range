import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeamDialogComponent } from './new-team-dialog.component';

describe('NewTeamDialogComponent', () => {
  let component: NewTeamDialogComponent;
  let fixture: ComponentFixture<NewTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTeamDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
