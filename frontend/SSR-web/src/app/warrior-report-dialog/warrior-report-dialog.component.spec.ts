import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarriorReportDialogComponent } from './warrior-report-dialog.component';

describe('WarriorReportDialogComponent', () => {
  let component: WarriorReportDialogComponent;
  let fixture: ComponentFixture<WarriorReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarriorReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarriorReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
