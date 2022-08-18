import { Injectable } from "@angular/core";
import { Agenda } from "./agenda";
import { AgendaType } from "./agenda-type";
import { AgendaConfigurationService } from "./configuration/agenda-configuration.service";

@Injectable({ providedIn: "root" })
export class AgendaFactoryService {
  constructor(
    private readonly agendaConfigurationProvider: AgendaConfigurationService
  ) {}

  createAgenda(type: AgendaType, name?: string) {
    return new Agenda(
      this.agendaConfigurationProvider.getConfiguration(type),
      name
    );
  }
}
