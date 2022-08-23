// This is needed in order to plug and play elements.
// These will be interchangable between different agendas and it would be possible
// to extract them from an agenda itself.

import { Time } from "src/app/core/time";
import { AgendaPoint } from "../points/agenda-point";
import { DefaultAgendaPoint } from "../points/default-agenda-point";

// In the future we might go with something agenda-specific, but for now this is the approach.
export class DefaultAgendaElements {
  private readonly wrappedAgendaElements = new Map<AgendaPoint, Time>();

  public get agendaElements() {
    return this.wrappedAgendaElements;
  }

  constructor() {
    this.wrappedAgendaElements.set(
      DefaultAgendaPoint.LastHRBump,
      new Time(3, 30)
    );
    this.wrappedAgendaElements.set(DefaultAgendaPoint.ToBed, new Time(7, 0));
    this.wrappedAgendaElements.set(DefaultAgendaPoint.WakeUp, new Time(0, 0));
    this.wrappedAgendaElements.set(
      DefaultAgendaPoint.BathroomTime,
      new Time(0, 45)
    );
    this.wrappedAgendaElements.set(DefaultAgendaPoint.AtOffice, new Time(0, 0));
    this.wrappedAgendaElements.set(
      DefaultAgendaPoint.MorningPages,
      new Time(0, 25)
    );
  }
}
