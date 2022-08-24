import { Time } from "src/app/core/time";
import { AgendaType } from "src/app/services/agenda/agenda-type";
import { HomeAgendaPoint } from "src/app/services/agenda/points/home-agenda-point";
import { TrainingAgendaPoint } from "src/app/services/agenda/points/training-agenda-point.enum";
import { AgendaInput } from "../../services/agenda-input";

export class AgendaModel {
  private agendaInputWrapped: AgendaInput;
  atOfficeId: number = 0;
  trainingTimeId: number = 0;
  tomeksTimeId: number = 0;

  get isTrainingAgenda(): boolean {
    return this.agendaInputWrapped.agendaType === AgendaType.Training;
  }

  get isTomeksAgenda(): boolean {
    return this.agendaInputWrapped.agendaType === AgendaType.Tomek;
  }

  get agendaInput(): AgendaInput {
    this.updateStartTimes();
    return this.agendaInputWrapped;
  }

  constructor(
    public atOfficeTimes: Time[],
    public trainingTimes: Time[],
    public tomeksTimes: Time[],
    label?: string
  ) {
    this.agendaInputWrapped = new AgendaInput(
      label ?? "Agenda",
      AgendaType.Default,
      atOfficeTimes[0]
    );

    this.updateStartTimes();
  }

  private updateStartTimes() {
    this.agendaInputWrapped.atOffice = this.atOfficeTimes[this.atOfficeId];

    this.agendaInputWrapped.startTimeOverrides.set(
      HomeAgendaPoint.AtTomeks,
      this.tomeksTimes[this.tomeksTimeId]
    );
    this.agendaInputWrapped.startTimeOverrides.set(
      TrainingAgendaPoint.Workout,
      this.trainingTimes[this.trainingTimeId]
    );
  }
}
