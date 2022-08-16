import { Time } from '@angular/common';
import { AgendaType } from './agenda/agenda-type';

export class AgendaInput {
  label: string;
  morningPages: boolean;
  agendaType: AgendaType;
  running: boolean;
  atOffice: Time;
}
