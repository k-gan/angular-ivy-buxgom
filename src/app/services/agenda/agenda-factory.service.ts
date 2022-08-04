import { Injectable } from '@angular/core';
import { Agenda } from './agenda';
import { AgendaElementCollaterService } from './agenda-element-collater.service';
import { DefaultAgenda } from './default-agenda';
import { TrainingAgenda } from './training-agenda';

@Injectable({ providedIn: 'root' })
export class AgendaFactoryService {
  constructor(
    private readonly agendaElementCollaterService: AgendaElementCollaterService
  ) {}

  createDefaultAgenda(name?: string): Agenda {
    return new DefaultAgenda(this.agendaElementCollaterService, name);
  }

  createTrainingAgenda(name?: string): Agenda {
    return new TrainingAgenda(this.agendaElementCollaterService, name);
  }
}
