import { Injectable } from "@angular/core";
import { Time } from "../core/time";
import { Agenda } from "./agenda/agenda";
import { AgendaPoint } from "./agenda/points/agenda-point";

@Injectable({ providedIn: "root" })
export class AgendaFinalizer {
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
}
