import { Time } from "@angular/common";
import { Injectable } from "@angular/core";
import {
  addTimes,
  compareTimes,
  DateTimeModifiers,
  printTime,
} from "../core/DateTimeModifiers";
import { AgendaInput } from "./agenda-input";
import { Agenda } from "./agenda/agenda";
import { AgendaFactoryService } from "./agenda/agenda-factory.service";
import { AgendaEnricherService } from "./agenda/enrichers/agenda-enricher.service";
import { HomeAgendaPoint } from "./agenda/points/home-agenda-point";
import { TrainingAgendaPoint } from "./agenda/points/training-agenda-point.enum";

@Injectable({ providedIn: "root" })
export class AgendaGenerationService {
  constructor(
    private readonly agendaFactoryService: AgendaFactoryService,
    private readonly agendaEnricherProvider: AgendaEnricherService
  ) {}

  generateAgenda(input: AgendaInput): Agenda {
    const agenda: Agenda = this.agendaFactoryService.createAgenda(
      input.agendaType,
      input.label
    );
    const enricher = this.agendaEnricherProvider.getEnricher(input.agendaType);
    const enrichedAgenda: Agenda = enricher.enrichAgenda(agenda, input);
    return this.finalizeAgenda(
      enrichedAgenda,
      input.atOffice,
      input.trainingTime,
      input.tomeksTime
    );
  }

  finalizeAgenda(
    agenda: Agenda,
    atOffice: Time,
    trainingTime: Time,
    tomeksTime: Time
  ): Agenda {
    let startTime = atOffice;
    let previousStartTime = atOffice;

    for (let agendaElement of agenda.agendaElements.reverse()) {
      startTime = DateTimeModifiers.decreaseTime(
        startTime,
        agendaElement.duration
      );

      if (agendaElement.agenda === TrainingAgendaPoint.Workout) {
        startTime = this.generateWorkoutStartTime(trainingTime);
      } else if (agendaElement.agenda === HomeAgendaPoint.AtTomeks) {
        startTime = this.generateWorkoutStartTime(tomeksTime);
      }

      const endTime = addTimes(startTime, agendaElement.duration);
      if (compareTimes(endTime, previousStartTime) !== 0) {
        agendaElement.warning = `Ends at ${printTime(
          endTime
        )} while the next event starts at ${printTime(previousStartTime)}`;
      }

      agendaElement.startTime = startTime;
      previousStartTime = startTime;
    }

    return agenda;
  }

  generateWorkoutStartTime(trainingTime: Time): Time {
    if (trainingTime === undefined) {
      return { hours: 7, minutes: 0 };
    }

    return trainingTime;
  }
}
