import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramCreatorComponent } from './diagram-creator.component';

describe('DiagramCreatorComponent', () => {
  let component: DiagramCreatorComponent;
  let fixture: ComponentFixture<DiagramCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagramCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
