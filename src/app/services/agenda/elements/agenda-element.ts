import { Time } from "src/app/core/time";
import { agendaElementWarning } from "./agenda-element-warning";
import { AgendaPoint } from "../points/agenda-point";

export class AgendaElement {
  startTime: Time;
  readonly name: string;
  warning: agendaElementWarning;

  constructor(public readonly agenda: AgendaPoint, public duration: Time) {
    this.name = agenda;
  }
}
