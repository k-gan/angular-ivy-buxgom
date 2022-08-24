import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Component, Input } from "@angular/core";
import { Time } from "src/app/core/time";
import { TimeComponentBase } from "src/app/core/time-component-base";
import { AgendaGenerationService } from "src/app/services/agenda-generation.service";
import { Agenda } from "src/app/services/agenda/agenda";
import { AgendaElement } from "src/app/services/agenda/elements/agenda-element";
import { AgendaPoint } from "src/app/services/agenda/points/agenda-point";
import { DefaultAgendaPoint } from "src/app/services/agenda/points/default-agenda-point";
import { HomeAgendaPoint } from "src/app/services/agenda/points/home-agenda-point";
import { TrainingAgendaPoint } from "src/app/services/agenda/points/training-agenda-point.enum";
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

  constructor(private readonly agendaGeneration: AgendaGenerationService) {
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

    this.regenerateAgenda();
  }

  drop(event: CdkDragDrop<AgendaElement[]>) {
    this.agenda.moveElement(event.previousIndex, event.currentIndex);

    this.regenerateAgenda();
  }

  private regenerateAgenda(): void {
    const atOffice: Time = this.getStartTime(DefaultAgendaPoint.AtOffice);

    const times = new Map<AgendaPoint, Time>([
      [HomeAgendaPoint.AtTomeks, this.getStartTime(HomeAgendaPoint.AtTomeks)],
      [
        TrainingAgendaPoint.Workout,
        this.getStartTime(TrainingAgendaPoint.Workout),
      ],
    ]);

    this.agendaGeneration.finalizeAgenda(this.agenda, atOffice, times);
    this.dayPlan.generateFromAgenda();
  }

  private getStartTime(point: AgendaPoint): Time {
    return this.dayPlan.getStartTime(point);
  }
}
