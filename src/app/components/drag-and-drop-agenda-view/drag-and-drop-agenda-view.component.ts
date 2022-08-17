import { Component, Inject, Input, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { AgendaSynchronizeService } from "src/app/services/agenda-synchronize.service";
import { Agenda } from "src/app/services/agenda/agenda";
import { AgendaElement } from "src/app/services/agenda/elements/agenda-element";
import { AgendaFactoryService } from "src/app/services/agenda/agenda-factory.service";
import { AgendaType } from "src/app/services/agenda/agenda-type";
import { DateTimeModifiers } from "src/app/core/DateTimeModifiers";
import { Time } from "@angular/common";
import { AgendaGenerationService } from "src/app/services/agenda-generation.service";
import { DefaultAgendaPoint } from "src/app/services/agenda/points/default-agenda-point";

@Component({
  selector: "app-drag-and-drop-agenda-view",
  templateUrl: "./drag-and-drop-agenda-view.component.html",
  styleUrls: ["./drag-and-drop-agenda-view.component.css"],
})
export class DragAndDropAgendaViewComponent implements OnInit {
  @Input() agenda: Agenda;

  constructor(private readonly agendaGeneration: AgendaGenerationService) {}

  printTime(time: Time) {
    return DateTimeModifiers.printTime(time);
  }

  ngOnInit() {}

  drop(event: CdkDragDrop<AgendaElement[]>) {
    moveItemInArray(
      this.agenda.agendaElements,
      event.previousIndex,
      event.currentIndex
    );
    const atOffice: Time = this.agenda.agendaElements.find(
      (e) => e.agenda === DefaultAgendaPoint.AtWork
    ).startTime;
    
    this.agendaGeneration.finalizeAgenda(this.agenda, atOffice);
  }
}
