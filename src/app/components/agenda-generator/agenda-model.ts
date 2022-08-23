import { Time } from "src/app/core/time";
import { AgendaType } from "src/app/services/agenda/agenda-type";
import { AgendaInput } from "../../services/agenda-input";

export class AgendaModel {
  agendaInput: AgendaInput;
  atOfficeId: number = 0;
  trainingTimeId: number = 0;
  tomeksTimeId: number = 0;

  get isTrainingAgenda(): boolean {
    return this.agendaInput.agendaType === AgendaType.Training;
  }

  get isTomeksAgenda(): boolean {
    return this.agendaInput.agendaType === AgendaType.Tomek;
  }

  get upToDateAgendaInput(): AgendaInput {
    this.agendaInput.atOffice = this.atOfficeTimes[this.atOfficeId];
    this.agendaInput.tomeksTime = this.tomeksTimes[this.tomeksTimeId];
    this.agendaInput.trainingTime = this.trainingTimes[this.trainingTimeId];

    return this.agendaInput;
  }

  constructor(
    public atOfficeTimes: Time[],
    public trainingTimes: Time[],
    public tomeksTimes: Time[],

    label?: string
  ) {
    this.agendaInput = new AgendaInput(
      label ?? "Agenda",
      AgendaType.Default,
      false,
      false,
      atOfficeTimes[0]
    );

    this.agendaInput.trainingTime = this.trainingTimes[this.trainingTimeId];
    this.agendaInput.tomeksTime = this.tomeksTimes[this.tomeksTimeId];
  }
}
