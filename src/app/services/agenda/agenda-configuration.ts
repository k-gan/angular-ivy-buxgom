import { Time } from "@angular/common";
import { AgendaPoint } from "./agenda-point";

export interface AgendaConfiguration {
    get defaultAgendaPoints(): AgendaPoint[];
    get validationPointTypes(): Object[];
    get availableAgendaPoints(): Map<AgendaPoint, Time>;
}
