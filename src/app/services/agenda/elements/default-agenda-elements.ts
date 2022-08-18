// This is needed in order to plug and play elements.
// These will be interchangable between different agendas and it would be possible
// to extract them from an agenda itself.

import { Time } from "@angular/common";
import { AgendaPoint } from "../points/agenda-point";
import { DefaultAgendaPoint } from "../points/default-agenda-point";

// In the future we might go with something agenda-specific, but for now this is the approach.
export class DefaultAgendaElements {
  private readonly wrappedAgendaElements = new Map<AgendaPoint, Time>();

  public get agendaElements() {
    return this.wrappedAgendaElements;
  }

  constructor() {
    this.wrappedAgendaElements.set(DefaultAgendaPoint.LastHRBump, {
      hours: 3,
      minutes: 30,
    });
    this.wrappedAgendaElements.set(DefaultAgendaPoint.ToBed, {
      hours: 7,
      minutes: 0,
    });
    this.wrappedAgendaElements.set(DefaultAgendaPoint.WakeUp, {
      hours: 0,
      minutes: 0,
    });
    this.wrappedAgendaElements.set(DefaultAgendaPoint.BathroomTime, {
      hours: 0,
      minutes: 45,
    });
    this.wrappedAgendaElements.set(DefaultAgendaPoint.AtOffice, {
      hours: 0,
      minutes: 0,
    });
    this.wrappedAgendaElements.set(DefaultAgendaPoint.MorningPages, {
      hours: 0,
      minutes: 25,
    });
  }
}
