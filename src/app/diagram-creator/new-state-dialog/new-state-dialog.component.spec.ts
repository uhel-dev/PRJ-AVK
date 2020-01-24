import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStateDialogComponent } from './new-state-dialog.component';

describe('NewStateDialogComponent', () => {
  let component: NewStateDialogComponent;
  let fixture: ComponentFixture<NewStateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
