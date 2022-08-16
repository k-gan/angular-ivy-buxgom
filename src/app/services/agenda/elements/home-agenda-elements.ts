import { Time } from '@angular/common';
import { HomeAgendaPoint } from '../points/home-agenda-point';

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
    this.wrappedAgendaElements.set(HomeAgendaPoint.DriveToTomeksFromHome, {
      hours: 0,
      minutes: 20,
    });
    this.wrappedAgendaElements.set(HomeAgendaPoint.AtTomeks, {
      hours: 0,
      minutes: 0,
    });
    this.wrappedAgendaElements.set(HomeAgendaPoint.DriveToOfficeFromTomeks, {
      hours: 0,
      minutes: 30,
    });
  }
}
