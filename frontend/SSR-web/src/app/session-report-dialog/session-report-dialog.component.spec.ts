import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionReportDialogComponent } from './session-report-dialog.component';

describe('SessionReportDialogComponent', () => {
  let component: SessionReportDialogComponent;
  let fixture: ComponentFixture<SessionReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
