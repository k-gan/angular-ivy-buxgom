import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateTimeModifiers } from '../core/DateTimeModifiers';
import { Agenda } from './agenda/agenda';
import { AgendaElementCollaterService } from './agenda/agenda-element-collater.service';
import { AgendaEnricher } from './agenda/enricher/agenda-enricher';
import { AgendaEnricherProviderService } from "./agenda/enricher/agenda-enricher-provider.service";
import { AgendaFactoryService } from './agenda/agenda-factory.service';
import { AgendaPoint } from './agenda/agenda-point';
import { AgendaType } from './agenda/agenda-type';
import { DefaultAgendaElements } from './agenda/default-agenda-elements';
import { DefaultAgendaPoint } from './agenda/default-agenda-point';
import { HomeAgendaElements } from './agenda/home-agenda-elements';
import { HomeAgendaPoint } from './agenda/home-agenda-point';
import { TrainingAgendaPoint } from './agenda/training-agenda-point.enum';
import { DayPlanInput } from './day-plan-input';

@Injectable({ providedIn: 'root' })
export class AgendaGenerationService {
  constructor(
    private readonly agendaFactoryService: AgendaFactoryService,
    private readonly agendaEnricherProvider : AgendaEnricherProviderService
  ) {
  }

  generateAgenda(input: DayPlanInput): Agenda {
    const agenda : Agenda = this.agendaFactoryService.createAgenda(input.agendaType, input.label);
    const enricher = this.agendaEnricherProvider.getEnricher(input.agendaType);
    const enrichedAgenda : Agenda = enricher.enrichAgenda(agenda, input);
    return this.finalizeAgenda(enrichedAgenda, input.atOffice);
  }

  private finalizeAgenda(agenda: Agenda, atOffice: Time): Agenda {
    let startTime = atOffice;
    for (let agendaElement of [...agenda.agendaElements].reverse()) {
      startTime = DateTimeModifiers.decreaseTime(
        startTime,
        agendaElement.duration
      );
      if (agendaElement.agenda == TrainingAgendaPoint.Workout) {
        const trainingTime: Time = { hours: 7, minutes: 0 };
        if (
          startTime.hours * 60 + startTime.minutes <
          trainingTime.hours * 60 + trainingTime.minutes
        ) {
          startTime = trainingTime;
        }
      }
      agendaElement.startTime = startTime;
    }

    return agenda;
  }
}
