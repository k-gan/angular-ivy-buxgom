import { Injectable } from "@angular/core";
import { AgendaInput } from "./agenda-input";
import { Agenda } from "./agenda/agenda";
import { AgendaFactoryService } from "./agenda/agenda-factory.service";
import { AgendaEnricherService } from "./agenda/enrichers/agenda-enricher.service";

@Injectable({ providedIn: "root" })
export class AgendaGenerationService {
  constructor(
    private readonly agendaFactoryService: AgendaFactoryService,
    private readonly agendaEnricherProvider: AgendaEnricherService
  ) {}

  createEnrichedAgenda(input: AgendaInput): Agenda {
    const agenda: Agenda = this.agendaFactoryService.createAgenda(
      input.agendaType,
      input.label
    );
    const enricher = this.agendaEnricherProvider.getEnricher(input.agendaType);
    return enricher.enrichAgenda(agenda, input);
  }
}
