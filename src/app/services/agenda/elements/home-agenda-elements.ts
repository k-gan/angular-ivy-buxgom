import { Time } from "src/app/core/time";
import { HomeAgendaPoint } from "../points/home-agenda-point";

export class HomeAgendaElements {
  private readonly wrappedAgendaElements = new Map<HomeAgendaPoint, Time>();

  public get agendaElements() {
    return this.wrappedAgendaElements;
  }

  constructor() {
    this.wrappedAgendaElements.set(
      HomeAgendaPoint.DriveToOfficeFromHome,
      new Time(0, 45)
    );
    this.wrappedAgendaElements.set(HomeAgendaPoint.Running, new Time(1, 0));
    this.wrappedAgendaElements.set(
      HomeAgendaPoint.DriveToTomeksFromHome,
      new Time(0, 20)
    );
    this.wrappedAgendaElements.set(HomeAgendaPoint.AtTomeks, new Time(0, 0));
    this.wrappedAgendaElements.set(
      HomeAgendaPoint.DriveToOfficeFromTomeks,
      new Time(0, 30)
    );
  }
}
