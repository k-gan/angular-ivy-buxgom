import { moveItemInArray } from "@angular/cdk/drag-drop";
import { AgendaConfiguration } from "./configuration/agenda-configuration";
import { AgendaElement } from "./elements/agenda-element";
import { AgendaPoint } from "./points/agenda-point";

export class Agenda {
  readonly name: string;

  private agendaElementsWrapped: Array<AgendaElement>;
  get agendaElements(): Array<AgendaElement> {
    return this.agendaElementsWrapped.slice();
  }

  constructor(
    protected readonly agendaConfiguration: AgendaConfiguration,
    name?: string
  ) {
    this.name = name ?? "Agenda";

    this.initializeAgenda();
  }

  addPointAfter(point: AgendaPoint, after: AgendaPoint) {
    const el = this.createAgendaElement(point);
    this.addElementAfter(after, el);
  }

  removeElement(pointOnAgenda: AgendaPoint): void {
    const idx = this.agendaElementsWrapped.findIndex(
      (el) => el.agenda === pointOnAgenda
    );
    this.agendaElementsWrapped.splice(idx, 1);
  }

  moveElement(previousIndex: number, currentIndex: number) {
    moveItemInArray(this.agendaElementsWrapped, previousIndex, currentIndex);
  }

  private addElementAfter(
    pointOnAgenda: AgendaPoint,
    element: AgendaElement
  ): void {
    const idx = this.agendaElementsWrapped.findIndex(
      (el) => el.agenda === pointOnAgenda
    );
    this.agendaElementsWrapped.splice(idx + 1, 0, element);
  }

  private createAgendaElement(agendaPoint: AgendaPoint): AgendaElement {
    return new AgendaElement(
      agendaPoint,
      this.agendaConfiguration.availableAgendaPoints.get(agendaPoint)
    );
  }

  private initializeAgenda(): void {
    const agenda: Array<AgendaElement> = [];
    for (let agendaPoint of this.agendaConfiguration.defaultAgendaPoints) {
      const agEl = this.createAgendaElement(agendaPoint);
      agenda.push(agEl);
    }
    this.agendaElementsWrapped = agenda;
  }
}
