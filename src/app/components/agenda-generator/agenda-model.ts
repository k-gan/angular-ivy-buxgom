import { Time } from "@angular/common";
import { AgendaType } from "src/app/services/agenda/agenda-type";
import { AgendaInput } from "../../services/agenda-input";

export class AgendaModel {
  agendaInput: AgendaInput;
  atOfficeId: number = 0;

  get upToDateAgendaInput(): AgendaInput {
    this.agendaInput.atOffice = this.atOfficeTimes[this.atOfficeId];
    return this.agendaInput;
  }

  constructor(public atOfficeTimes: Time[], label?: string) {
    this.agendaInput = {
      label: label ?? "Agenda",
      morningPages: false,
      running: false,
      atOffice: atOfficeTimes[0],
      agendaType: AgendaType.Default,
    };
  }
}
