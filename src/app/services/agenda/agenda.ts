import { AgendaConfiguration } from './configuration/agenda-configuration';
import { AgendaElement } from './elements/agenda-element';
import { AgendaPoint } from './points/agenda-point';
import { MissingAgendaValidatorService } from './missing-agenda-validator.service';

export class Agenda {
  readonly name: string;

  private agendaElementsWrapped: Array<AgendaElement>;
  public get agendaElements() : Array<AgendaElement> {
    return this.agendaElementsWrapped.slice();
  }

  constructor(
    private readonly missingAgendaValidator: MissingAgendaValidatorService,
    protected readonly agendaConfiguration: AgendaConfiguration,
    name?: string
  ) {
    this.name = name ?? 'Agenda';

    this.initializeAgenda();
    this.validateAgenda();
  }

  addPointAfter(point: AgendaPoint, after: AgendaPoint)
  {
    const el = this.createAgendaElement(point);
    this.addElementAfter(after, el);
  }

  removeElement(pointOnAgenda: AgendaPoint): void {
    const idx = this.agendaElementsWrapped.findIndex(
      (el) => el.agenda === pointOnAgenda
    );
    this.agendaElementsWrapped.splice(idx, 1);
  }

  private addElementAfter(pointOnAgenda: AgendaPoint, element: AgendaElement): void {
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

  private validateAgenda(): void {
    this.missingAgendaValidator.validateAgenda(
      this.agendaConfiguration.validationPointTypes,
      this.agendaElementsWrapped
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
