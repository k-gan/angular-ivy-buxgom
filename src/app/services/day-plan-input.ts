import { Time } from '@angular/common';
import { AgendaType } from './agenda/agenda-type';

export class DayPlanInput {
  label: string;
  morningPages: boolean;
  agendaType: AgendaType;
  training: boolean;
  tomeks: boolean;
  running: boolean;
  atOffice: Time;
}
