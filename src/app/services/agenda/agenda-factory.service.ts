import { Injectable } from '@angular/core';
import { Agenda } from './agenda';
import { AgendaConfigurationService } from './configuration/agenda-configuration.service';
import { AgendaType } from './agenda-type';
import { MissingAgendaValidatorService } from './missing-agenda-validator.service';

@Injectable({ providedIn: 'root' })
export class AgendaFactoryService {
  constructor(
    private readonly missingAgendaValidator: MissingAgendaValidatorService,
    private readonly agendaConfigurationProvider: AgendaConfigurationService
  ) {}

  createAgenda(type: AgendaType, name? : string) {
    return new Agenda(
      this.missingAgendaValidator,
      this.agendaConfigurationProvider.getConfiguration(type),
      name
    );
  }
}
