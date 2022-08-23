import { Time } from "src/app/core/time";
import { AgendaPoint } from "../points/agenda-point";

export interface AgendaConfiguration {
  get defaultAgendaPoints(): AgendaPoint[];
  get validationPointTypes(): Object[];
  get availableAgendaPoints(): Map<AgendaPoint, Time>;
}
