import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateTimeModifiers } from '../../core/DateTimeModifiers';
import { AgendaSynchronizeService } from '../../services/agenda-synchronize.service';
import { Agenda } from '../../services/agenda/agenda';
import { AgendaElement } from '../../services/agenda/elements/agenda-element';
import { AgendaPoint } from '../../services/agenda/points/agenda-point';
import { DefaultAgendaPoint } from '../../services/agenda/points/default-agenda-point';
import { DayPlan } from '../../services/day-plan';

@Component({
  selector: 'app-day-plan-calendar',
  templateUrl: './day-plan-calendar.component.html',
  styleUrls: ['./day-plan-calendar.component.css'],
})
export class DayPlanCalendarComponent {
  dayPlans: DayPlan[] = [];
  visibility: boolean = false;

  constructor(public agendaSyncService: AgendaSynchronizeService) {
    agendaSyncService.agendaChanged$.subscribe((agenda: Agenda) => {
      this.agendaUpdate(agenda);
    });
  }

  printTime(time: Time): string {
    return DateTimeModifiers.printTime(time);
  }

  onRemove(dayPlan: any): void {
    this.dayPlans = this.dayPlans.filter((fDayPlan) => fDayPlan !== dayPlan);
    this.updateVisibility();
  }

  updateVisibility() {
    this.visibility = this.dayPlans.length > 0;
  }

  private agendaUpdate(agenda: Agenda): void {
    const dayPlan = this.createDayPlanFromAgenda(agenda);
    this.dayPlans.push(dayPlan);
    this.updateVisibility();
  }

  private createDayPlanFromAgenda(agenda: Agenda): DayPlan {
    const dayPlan = new DayPlan(
      agenda.name,
      this.getStartTime(agenda.agendaElements, DefaultAgendaPoint.AtWork),
      this.getStartTime(agenda.agendaElements, DefaultAgendaPoint.WakeUp),
      this.getStartTime(agenda.agendaElements, DefaultAgendaPoint.ToBed),
      this.getStartTime(agenda.agendaElements, DefaultAgendaPoint.LastHRBump)
    );
    dayPlan.agenda = agenda;

    return dayPlan;
  }

  private getStartTime(agenda: Array<AgendaElement>, point: AgendaPoint): Time {
    const agEl = agenda.find((a) => a.agenda === point);
    return agEl?.startTime;
  }
}
