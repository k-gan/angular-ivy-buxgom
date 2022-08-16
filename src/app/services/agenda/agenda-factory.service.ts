import { Injectable } from '@angular/core';
import { Agenda } from './agenda';
import { AgendaConfigurationProviderService } from './configuration/agenda-configuration-provider.service';
import { AgendaElementCollaterService } from './elements/agenda-element-collater.service';
import { AgendaType } from './agenda-type';
import { DefaultAgendaConfiguration } from './configuration/default-agenda-configuration';
import { MissingAgendaValidatorService } from './missing-agenda-validator.service';
import { TrainingAgendaConfiguration } from './configuration/training-agenda-configuration';

@Injectable({ providedIn: 'root' })
export class AgendaFactoryService {
  constructor(
    private readonly missingAgendaValidator: MissingAgendaValidatorService,
    private readonly agendaElementCollaterService: AgendaElementCollaterService,
    private readonly agendaConfigurationProvider: AgendaConfigurationProviderService
  ) {}

  createAgenda(type: AgendaType, name? : string) {
    return new Agenda(
      this.missingAgendaValidator,
      this.agendaElementCollaterService,
      this.agendaConfigurationProvider.getConfiguration(type),
      name
    );
  }
}
