import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Time } from "@angular/common";
import { Component, Input } from "@angular/core";
import { convertStringToTime } from "src/app/core/DateTimeModifiers";
import { TimeComponentBase } from "src/app/core/time-component-base";
import { AgendaGenerationService } from "src/app/services/agenda-generation.service";
import { Agenda } from "src/app/services/agenda/agenda";
import { AgendaElement } from "src/app/services/agenda/elements/agenda-element";
import { DefaultAgendaPoint } from "src/app/services/agenda/points/default-agenda-point";
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
    this.editedElement.duration = convertStringToTime(this.editedDuration);
    this.cancelEdit();

    this.regenerateAgenda();
  }

  drop(event: CdkDragDrop<AgendaElement[]>) {
    this.agenda.moveElement(event.previousIndex, event.currentIndex);

    this.regenerateAgenda();
  }

  private regenerateAgenda(): void {
    const atOffice: Time = this.dayPlan.getStartTime(
      DefaultAgendaPoint.AtOffice
    );

    this.agendaGeneration.finalizeAgenda(this.agenda, atOffice);
    this.dayPlan.generateFromAgenda();
  }
}
