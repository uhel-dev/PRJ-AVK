import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameStateDialogComponent } from './rename-state-dialog.component';

describe('RenameStateDialogComponent', () => {
  let component: RenameStateDialogComponent;
  let fixture: ComponentFixture<RenameStateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenameStateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameStateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
