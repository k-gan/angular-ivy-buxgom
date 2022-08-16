import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateTimeModifiers } from '../core/DateTimeModifiers';
import { Agenda } from './agenda/agenda';
import { AgendaEnricherProviderService } from "./agenda/enricher/agenda-enricher-provider.service";
import { AgendaFactoryService } from './agenda/agenda-factory.service';
import { TrainingAgendaPoint } from './agenda/points/training-agenda-point.enum';
import { AgendaInput } from './agenda-input';

@Injectable({ providedIn: 'root' })
export class AgendaGenerationService {
  constructor(
    private readonly agendaFactoryService: AgendaFactoryService,
    private readonly agendaEnricherProvider : AgendaEnricherProviderService
  ) {
  }

  generateAgenda(input: AgendaInput): Agenda {
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
