/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DragAndDropAgendaViewComponent } from './drag-and-drop-agenda-view.component';

describe('DragAndDropAgendaViewComponent', () => {
  let component: DragAndDropAgendaViewComponent;
  let fixture: ComponentFixture<DragAndDropAgendaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragAndDropAgendaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropAgendaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
