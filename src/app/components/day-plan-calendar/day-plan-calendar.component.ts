import { Time } from "@angular/common";
import { Component } from "@angular/core";
import { DateTimeModifiers } from "../../core/DateTimeModifiers";
import { AgendaSynchronizeService } from "../../services/agenda-synchronize.service";
import { Agenda } from "../../services/agenda/agenda";
import { DayPlan } from "../../services/day-plan";

@Component({
  selector: "app-day-plan-calendar",
  templateUrl: "./day-plan-calendar.component.html",
  styleUrls: ["./day-plan-calendar.component.css"],
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
    const dayPlan = new DayPlan(agenda);
    this.dayPlans.push(dayPlan);
    this.updateVisibility();
  }
}
