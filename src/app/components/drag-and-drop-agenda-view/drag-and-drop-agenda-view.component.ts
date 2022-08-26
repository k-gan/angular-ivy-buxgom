import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Component, Input } from "@angular/core";
import { Time } from "src/app/core/time";
import { TimeComponentBase } from "src/app/core/time-component-base";
import { AgendaFinalizer } from "src/app/services/agenda-finalizer.service";
import { Agenda } from "src/app/services/agenda/agenda";
import { AgendaElement } from "src/app/services/agenda/elements/agenda-element";
import { AgendaPoint } from "src/app/services/agenda/points/agenda-point";
import { DefaultAgendaPoint } from "src/app/services/agenda/points/default-agenda-point";
import { HomeAgendaPoint } from "src/app/services/agenda/points/home-agenda-point";
import { WorkoutAgendaPoint } from "src/app/services/agenda/points/workout-agenda-point.enum";
import { DayPlan } from "src/app/services/day-plan";

@Component({
  selector: "app-drag-and-drop-agenda-view",
  templateUrl: "./drag-and-drop-agenda-view.component.html",
  styleUrls: ["./drag-and-drop-agenda-view.component.css"],
})
export class DragAndDropAgendaViewComponent extends TimeComponentBase {
  @Input() dayPlan: DayPlan;

  editedElement: AgendaElement;
  editedDuration: string;

  get agenda(): Agenda {
    return this.dayPlan.agenda;
  }

  constructor(private readonly agendaFinalizer: AgendaFinalizer) {
    super();
  }

  edit(agendaElement: AgendaElement): void {
    this.editedElement = agendaElement;
    this.editedDuration = this.printTime(this.editedElement.duration);
  }

  cancelEdit(): void {
    this.editedElement = undefined;
    this.editedDuration = undefined;
  }

  save(): void {
    this.editedElement.duration = Time.parse(this.editedDuration);
    this.cancelEdit();

    this.recalculateAgenda();
  }

  drop(event: CdkDragDrop<AgendaElement[]>) {
    this.agenda.moveElement(event.previousIndex, event.currentIndex);

    this.recalculateAgenda();
  }

  private recalculateAgenda(): void {
    const atOffice: Time = this.getStartTime(DefaultAgendaPoint.AtOffice);

    const times = new Map<AgendaPoint, Time>([
      [HomeAgendaPoint.AtTomeks, this.getStartTime(HomeAgendaPoint.AtTomeks)],
      [
        WorkoutAgendaPoint.Workout,
        this.getStartTime(WorkoutAgendaPoint.Workout),
      ],
    ]);

    this.agendaFinalizer.finalizeAgenda(this.agenda, atOffice, times);
    this.dayPlan.generateFromAgenda();
  }

  private getStartTime(point: AgendaPoint): Time {
    return this.dayPlan.getStartTime(point);
  }
}
