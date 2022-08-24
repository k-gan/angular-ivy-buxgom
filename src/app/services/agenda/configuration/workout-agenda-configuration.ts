import { Time } from "src/app/core/time";
import { DefaultAgendaElements } from "../elements/default-agenda-elements";
import { WorkoutAgendaElements } from "../elements/workout-agenda-elements";
import { AgendaPoint } from "../points/agenda-point";
import { DefaultAgendaPoint } from "../points/default-agenda-point";
import { WorkoutAgendaPoint } from "../points/workout-agenda-point.enum";
import { AgendaConfiguration } from "./agenda-configuration";

export class WorkoutAgendaConfiguration implements AgendaConfiguration {
  get availableAgendaPoints(): Map<AgendaPoint, Time> {
    return new Map<AgendaPoint, Time>([
      ...new DefaultAgendaElements().agendaElements,
      ...new WorkoutAgendaElements().agendaElements,
    ]);
  }

  get validationPointTypes(): Object[] {
    return new Array<Object>(DefaultAgendaPoint, WorkoutAgendaPoint);
  }
  get defaultAgendaPoints(): AgendaPoint[] {
    return new Array<AgendaPoint>(
      DefaultAgendaPoint.LastHRBump,
      DefaultAgendaPoint.ToBed,
      DefaultAgendaPoint.WakeUp,
      WorkoutAgendaPoint.PreGymBathroom,
      WorkoutAgendaPoint.DriveToGymFromHome,
      WorkoutAgendaPoint.WarmUp,
      WorkoutAgendaPoint.Workout,
      WorkoutAgendaPoint.PostWorkout,
      WorkoutAgendaPoint.DriveToOfficeFromGym,
      DefaultAgendaPoint.AtOffice
    );
  }
}
