import { Time } from "../core/time";
import { AgendaType } from "./agenda/agenda-type";
import { AgendaPoint } from "./agenda/points/agenda-point";

export class AgendaInput {
  readonly startTimeOverrides = new Map<AgendaPoint, Time>();
  morningPages: boolean;
  running: boolean;

  constructor(
    public label: string,
    public agendaType: AgendaType,
    public atOffice: Time
  ) {}
}
