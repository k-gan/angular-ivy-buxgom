import { AgendaElement } from './agenda-element';
import { AgendaElementCollaterService } from './agenda-element-collater.service';
import { AgendaPoint } from './agenda-point';
import { MissingAgendaValidatorService } from './missing-agenda-validator.service';

export abstract class Agenda {
  agendaElements: Array<AgendaElement>;
  readonly name: string;

  constructor(
    private readonly missingAgendaValidator: MissingAgendaValidatorService,
    protected readonly agendaElementCollater: AgendaElementCollaterService,
    name?: string
  ) {
    this.name = name ?? 'Agenda';

    this.registerAgendaElements();
    this.initializeAgenda();
    this.validateAgenda();
  }

  protected abstract registerAgendaElements(): void;
  protected abstract agendaPoints(): Array<AgendaPoint>;
  protected abstract pointTypesToValidate(): Array<Object>;

  private validateAgenda(): void {
    this.missingAgendaValidator.validateAgenda(
      this.pointTypesToValidate(),
      this.agendaElements
    );
  }

  private initializeAgenda(): void {
    const agenda: Array<AgendaElement> = [];
    for (let agendaPoint of this.agendaPoints()) {
      const agEl = this.agendaElementCollater.createAgendaElement(agendaPoint);
      agenda.push(agEl);
    }
    this.agendaElements = agenda;
  }

  addElementAfter(pointOnAgenda: AgendaPoint, element: AgendaElement): void {
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
}
