import { Injectable } from "@angular/core";
import { AgendaType } from "../agenda-type";
import { DefaultAgendaEnricher } from "./default-agenda-enricher";
import { TomekAgendaEnricher } from "./tomek-agenda-enricher";
import { WorkoutAgendaEnricher } from "./workout-agenda-enricher";

@Injectable({ providedIn: "root" })
export class AgendaEnricherService {
  getEnricher(agendaType: AgendaType) {
    switch (agendaType) {
      case AgendaType.Default:
        return new DefaultAgendaEnricher();
      case AgendaType.Tomek:
        return new TomekAgendaEnricher(new DefaultAgendaEnricher());
      case AgendaType.Workout:
        return new WorkoutAgendaEnricher();
      default:
        console.log(
          "Error: agenda type not configured in enricher " + agendaType
        );
    }
  }
}
