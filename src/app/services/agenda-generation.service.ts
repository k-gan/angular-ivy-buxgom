import { Injectable } from "@angular/core";
import { Time } from "../core/time";
import { AgendaInput } from "./agenda-input";
import { Agenda } from "./agenda/agenda";
import { AgendaFactoryService } from "./agenda/agenda-factory.service";
import { AgendaEnricherService } from "./agenda/enrichers/agenda-enricher.service";
import { AgendaPoint } from "./agenda/points/agenda-point";

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
      input.startTimeOverrides
    );
  }

  finalizeAgenda(
    agenda: Agenda,
    atOffice: Time,
    startTimeOverrides: Map<AgendaPoint, Time>
  ): Agenda {
    let startTime = atOffice;
    let previousStartTime = atOffice;

    for (let agendaElement of agenda.agendaElements.reverse()) {
      startTime =
        startTimeOverrides.get(agendaElement.agenda) ??
        startTime.subtract(agendaElement.duration);

      const endTime = startTime.add(agendaElement.duration);
      if (!endTime.isEqual(previousStartTime)) {
        agendaElement.warning = {
          endTime: endTime,
          nextPointStartTime: previousStartTime,
        };
      }

      agendaElement.startTime = startTime;
      previousStartTime = startTime;
    }

    return agenda;
  }

  generateWorkoutStartTime(trainingTime: Time): Time {
    if (trainingTime === undefined) return new Time(7, 0);

    return trainingTime;
  }
}
