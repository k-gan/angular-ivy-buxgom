import { Time } from "@angular/common";
import { AgendaPoint } from "../points/agenda-point";

export class AgendaElement {
  startTime: Time;
  readonly name: string;
  warning: string = "";

  constructor(public readonly agenda: AgendaPoint, public duration: Time) {
    this.name = agenda;
  }
}
