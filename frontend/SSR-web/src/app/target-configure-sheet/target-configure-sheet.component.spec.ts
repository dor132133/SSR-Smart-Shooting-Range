import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetConfigureSheetComponent } from './target-configure-sheet.component';

describe('TargetConfigureSheetComponent', () => {
  let component: TargetConfigureSheetComponent;
  let fixture: ComponentFixture<TargetConfigureSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetConfigureSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetConfigureSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
