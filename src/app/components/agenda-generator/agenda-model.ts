import { Time } from "src/app/core/time";
import { AgendaType } from "src/app/services/agenda/agenda-type";
import { HomeAgendaPoint } from "src/app/services/agenda/points/home-agenda-point";
import { WorkoutAgendaPoint } from "src/app/services/agenda/points/workout-agenda-point.enum";
import { AgendaInput } from "../../services/agenda-input";

export class AgendaModel {
  private agendaInputWrapped: AgendaInput;
  atOfficeId: number = 0;
  workoutTimeId: number = 0;
  atTomeksTimeId: number = 0;

  get isWorkoutAgenda(): boolean {
    return this.agendaInputWrapped.agendaType === AgendaType.Workout;
  }

  get isAtTomeksAgenda(): boolean {
    return this.agendaInputWrapped.agendaType === AgendaType.Tomek;
  }

  get agendaInput(): AgendaInput {
    this.updateStartTimes();
    return this.agendaInputWrapped;
  }

  constructor(
    public atOfficeTimes: Time[],
    public workoutTimes: Time[],
    public atTomeksTimes: Time[],
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
      this.atTomeksTimes[this.atTomeksTimeId]
    );
    this.agendaInputWrapped.startTimeOverrides.set(
      WorkoutAgendaPoint.Workout,
      this.workoutTimes[this.workoutTimeId]
    );
  }
}
