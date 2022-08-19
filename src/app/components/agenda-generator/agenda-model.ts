import { Time } from "@angular/common";
import { AgendaType } from "src/app/services/agenda/agenda-type";
import { AgendaInput } from "../../services/agenda-input";

export class AgendaModel {
  agendaInput: AgendaInput;
  atOfficeId: number = 0;
  trainingTimeId: number = 0;

  get isTrainingAgenda(): boolean {
    return this.agendaInput.agendaType === AgendaType.Training;
  }

  get upToDateAgendaInput(): AgendaInput {
    this.agendaInput.atOffice = this.atOfficeTimes[this.atOfficeId];
    this.agendaInput.trainingTime = this.trainingTimes[this.trainingTimeId];
    console.log(this.agendaInput);
    return this.agendaInput;
  }

  constructor(
    public atOfficeTimes: Time[],
    public trainingTimes: Time[],
    label?: string
  ) {
    this.agendaInput = new AgendaInput(
      label ?? "Agenda",
      AgendaType.Default,
      false,
      false,
      atOfficeTimes[0]
    );
  }
}
