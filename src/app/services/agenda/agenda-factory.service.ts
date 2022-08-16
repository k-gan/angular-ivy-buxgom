import { Injectable } from '@angular/core';
import { Agenda } from './agenda';
import { AgendaElementCollaterService } from './agenda-element-collater.service';
import { DefaultAgendaConfiguration } from './default-agenda-configuration';
import { MissingAgendaValidatorService } from './missing-agenda-validator.service';
import { TrainingAgendaConfiguration } from './training-agenda-configuration';

@Injectable({ providedIn: 'root' })
export class AgendaFactoryService {
  constructor(
    private readonly missingAgendaValidator: MissingAgendaValidatorService,
    private readonly agendaElementCollaterService: AgendaElementCollaterService
  ) {}

  // TODO: Fix this, configuration should be supplied by a service.
  createDefaultAgenda(name?: string): Agenda {
    return new Agenda(
      this.missingAgendaValidator,
      this.agendaElementCollaterService,
      new DefaultAgendaConfiguration(),
      name
    );
  }

  // TODO: Fix this, configuration should be supplied by a service.
  createTrainingAgenda(name?: string): Agenda {
    return new Agenda(
      this.missingAgendaValidator,
      this.agendaElementCollaterService,
      new TrainingAgendaConfiguration(),
      name
    );
  }
}
