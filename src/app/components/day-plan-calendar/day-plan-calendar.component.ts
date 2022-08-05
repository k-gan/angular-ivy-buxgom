import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DateTimeModifiers } from '../../core/DateTimeModifiers';
import { AgendaSynchronizeService } from '../../services/agenda-synchronize.service';
import { Agenda } from '../../services/agenda/agenda';
import { AgendaPoint } from '../../services/agenda/agenda-point';
import { DefaultAgendaPoint } from '../../services/agenda/default-agenda-point';
import { DayPlan } from '../../services/day-plan';

@Component({
  selector: 'app-day-plan-calendar',
  templateUrl: './day-plan-calendar.component.html',
  styleUrls: ['./day-plan-calendar.component.css'],
})
export class DayPlanCalendarComponent implements OnInit {
  dayPlans: DayPlan[] = [];
  visibility: string = 'hidden';

  private readonly coreAgendaPoints: Array<AgendaPoint> = [
    DefaultAgendaPoint.LastHRBump,
    DefaultAgendaPoint.ToBed,
    DefaultAgendaPoint.WakeUp,
    DefaultAgendaPoint.AtWork,
  ];

  printTime(time: Time): string {
    return DateTimeModifiers.printTime(time);
  }

  constructor(public agendaSyncService: AgendaSynchronizeService) {
    agendaSyncService.agendaChanged$.subscribe((agenda: Agenda) => {
      const dayPlans: Array<DayPlan> = [];
      const coreElements = agenda.agenda.filter(
        (agEl) =>
          this.coreAgendaPoints.findIndex((cap) => cap === agEl.agenda) > -1
      );

      const lhrBump: Time = agenda.agenda.find(
        (agEl) => agEl.agenda === DefaultAgendaPoint.LastHRBump
      ).startTime;
      const toBed: Time = agenda.agenda.find(
        (agEl) => agEl.agenda === DefaultAgendaPoint.ToBed
      ).startTime;
      const wakeUp: Time = agenda.agenda.find(
        (agEl) => agEl.agenda === DefaultAgendaPoint.WakeUp
      ).startTime;
      const atOffice: Time = agenda.agenda.find(
        (agEl) => agEl.agenda === DefaultAgendaPoint.AtWork
      ).startTime;

      const dayPlan = new DayPlan(
        agenda.name,
        atOffice,
        wakeUp,
        toBed,
        lhrBump
      );
      dayPlan.agenda = agenda;
      this.dayPlans.push(dayPlan);
      this.updateVisibility();
    });
  }

  public onRemove(dayPlan: any): void {
    this.dayPlans = this.dayPlans.filter((fDayPlan) => fDayPlan !== dayPlan);
    this.updateVisibility();
  }
  updateVisibility() {
    this.visibility = this.dayPlans.length > 0 ? 'visible' : 'hidden';
  }

  ngOnInit() {}
}
