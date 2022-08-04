import { Time } from '@angular/common';
import { DayPlanInput } from '../../services/day-plan-input';

export class AgendaModel {
  agendaInput: DayPlanInput;
  atOfficeId: number = 0;

  get upToDateAgendaInput(): DayPlanInput {
    this.agendaInput.atOffice = this.atOfficeTimes[this.atOfficeId];
    return this.agendaInput;
  }

  constructor(public atOfficeTimes: Time[]) {
    this.agendaInput = {
      label: 'Agenda',
      morningPages: false,
      training: false,
      tomeks: false,
      running: false,
      atOffice: atOfficeTimes[0],
    };
  }
}
