import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DayPlanCalendarComponent } from './components/day-plan-calendar/day-plan-calendar.component';
import { AgendaGeneratorComponent } from './components/agenda-generator/agenda-generator.component';
import { TypeExclusiveAgendaGeneratorComponent } from './components/type-exclusive-agenda-generator/type-exclusive-agenda-generator.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    DayPlanCalendarComponent,
    AgendaGeneratorComponent,
    TypeExclusiveAgendaGeneratorComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
