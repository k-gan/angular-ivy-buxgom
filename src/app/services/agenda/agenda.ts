import { AgendaElement } from './agenda-element';
import { AgendaElementCollaterService } from './agenda-element-collater.service';
import { AgendaPoint } from './agenda-point';

export abstract class Agenda {
  agenda: Array<AgendaElement>;
  readonly name: string;

  constructor(
    protected readonly agendaElementCollater: AgendaElementCollaterService,
    name?: string
  ) {
    this.name = name ?? 'Agenda';

    this.registerAgendaElements();
    this.initializeAgenda();
    this.validateAgenda();
  }
  protected abstract registerAgendaElements(): void;
  protected abstract initializeAgenda(): void;
  protected abstract pointTypesToValidate(): Array<Object>;

  private validateAgenda() {
    for (let points of this.pointTypesToValidate()) {
      const availablePoints: Array<string> = Object.values(points);
      const usedPoints: Array<string> = this.agenda.map((aEl) => aEl.agenda);
      const unusedPoints = availablePoints.filter(
        (ap) => usedPoints.findIndex((up) => up === ap) < 0
      );

      if (unusedPoints.length > 0) {
        console.log(
          `Unused points in (${this.constructor.name}): ${JSON.stringify(
            unusedPoints
          )}`
        );
      }
    }
  }

  addElementAfter(pointOnAgenda: AgendaPoint, element: AgendaElement): void {
    const idx = this.agenda.findIndex((el) => el.agenda === pointOnAgenda);
    this.agenda.splice(idx + 1, 0, element);
  }

  removeElement(pointOnAgenda: AgendaPoint): void {
    const idx = this.agenda.findIndex((el) => el.agenda === pointOnAgenda);
    this.agenda.splice(idx, 1);
  }
}
