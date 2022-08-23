import { Time } from "../core/time";
import { AgendaType } from "./agenda/agenda-type";

export class AgendaInput {
  trainingTime: Time;
  tomeksTime: Time;

  constructor(
    public label: string,
    public agendaType: AgendaType,
    public morningPages: boolean,
    public running: boolean,
    public atOffice: Time
  ) {}
}
