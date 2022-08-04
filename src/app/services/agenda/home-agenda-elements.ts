import { Time } from '@angular/common';
import { HomeAgendaPoint } from './home-agenda-point';

export class HomeAgendaElements {
  private readonly wrappedAgendaElements = new Map<HomeAgendaPoint, Time>();

  public get agendaElements() {
    return this.wrappedAgendaElements;
  }

  constructor() {
    this.wrappedAgendaElements.set(HomeAgendaPoint.DriveToOfficeFromHome, {
      hours: 0,
      minutes: 45,
    });
    this.wrappedAgendaElements.set(HomeAgendaPoint.Running, {
      hours: 1,
      minutes: 0,
    });
  }
}
