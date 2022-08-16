import { AgendaConfiguration } from './agenda-configuration';
import { AgendaElement } from './agenda-element';
import { AgendaElementCollaterService } from './agenda-element-collater.service';
import { AgendaPoint } from './agenda-point';
import { MissingAgendaValidatorService } from './missing-agenda-validator.service';

export class Agenda {
  agendaElements: Array<AgendaElement>;
  readonly name: string;

  constructor(
    private readonly missingAgendaValidator: MissingAgendaValidatorService,
    protected readonly agendaElementCollater: AgendaElementCollaterService,
    protected readonly agendaConfiguration: AgendaConfiguration,
    name?: string
  ) {
    this.name = name ?? 'Agenda';

    this.registerAgendaElements();
    this.initializeAgenda();
    this.validateAgenda();
  }

  addPointAfter(after: AgendaPoint, point: AgendaPoint)
  {
    const el = this.agendaElementCollater.createAgendaElement(point);
    this.addElementAfter(after, el);
  }

  private addElementAfter(pointOnAgenda: AgendaPoint, element: AgendaElement): void {
    const idx = this.agendaElements.findIndex(
      (el) => el.agenda === pointOnAgenda
    );
    this.agendaElements.splice(idx + 1, 0, element);
  }

  removeElement(pointOnAgenda: AgendaPoint): void {
    const idx = this.agendaElements.findIndex(
      (el) => el.agenda === pointOnAgenda
    );
    this.agendaElements.splice(idx, 1);
  }

  private registerAgendaElements() : void {
    this.agendaElementCollater.registerAgendaElements(this.agendaConfiguration.availableAgendaPoints)
  }

  private validateAgenda(): void {
    this.missingAgendaValidator.validateAgenda(
      this.agendaConfiguration.validationPointTypes,
      this.agendaElements
    );
  }

  private initializeAgenda(): void {
    const agenda: Array<AgendaElement> = [];
    for (let agendaPoint of this.agendaConfiguration.defaultAgendaPoints) {
      const agEl = this.agendaElementCollater.createAgendaElement(agendaPoint);
      agenda.push(agEl);
    }
    this.agendaElements = agenda;
  }
}
