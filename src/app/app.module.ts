import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop'

import { AppComponent } from './app.component';
import { DayPlanCalendarComponent } from './components/day-plan-calendar/day-plan-calendar.component';
import { AgendaGeneratorComponent } from './components/agenda-generator/agenda-generator.component';
import { DragAndDropAgendaViewComponent } from './components/drag-and-drop-agenda-view/drag-and-drop-agenda-view.component';

@NgModule({
  imports: [BrowserModule, FormsModule, DragDropModule],
  declarations: [
    AppComponent,
    DayPlanCalendarComponent,
    AgendaGeneratorComponent,
    DragAndDropAgendaViewComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
