import { Time } from '@angular/common';
import { Agenda } from './agenda/agenda';

export class DayPlan {
  public agenda: Agenda;

  constructor(
    public label: string,
    public atOffice: Time,
    public wakeUp: Time,
    public toBed: Time,
    public lastHRBump: Time
  ) {}
}
