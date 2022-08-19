import { Time } from "@angular/common";
import { AgendaPoint } from "../points/agenda-point";

export class AgendaElement {
  public startTime: Time;
  public readonly name: string;

  constructor(public readonly agenda: AgendaPoint, public duration: Time) {
    this.name = agenda;
  }
}
