import { Injectable } from "@angular/core";
import { AgendaType } from "../agenda-type";
import { AgendaConfiguration } from "./agenda-configuration";
import { DefaultAgendaConfiguration } from "./default-agenda-configuration";
import { TrainingAgendaConfiguration } from "./training-agenda-configuration";

@Injectable({
  providedIn: "root",
})
export class AgendaConfigurationService {
  private readonly agendaConfigMap: Map<AgendaType, AgendaConfiguration>;

  constructor() {
    this.agendaConfigMap = new Map<AgendaType, AgendaConfiguration>([
      [AgendaType.Default, new DefaultAgendaConfiguration()],
      [AgendaType.Tomek, new DefaultAgendaConfiguration()],
      [AgendaType.Workout, new TrainingAgendaConfiguration()],
    ]);
  }

  getConfiguration(agendaType: AgendaType): AgendaConfiguration {
    return this.agendaConfigMap.get(agendaType);
  }
}
