import { Time } from "src/app/core/time";
import { DefaultAgendaElements } from "../elements/default-agenda-elements";
import { TrainingAgendaElements } from "../elements/training-agenda-elements";
import { AgendaPoint } from "../points/agenda-point";
import { DefaultAgendaPoint } from "../points/default-agenda-point";
import { TrainingAgendaPoint } from "../points/training-agenda-point.enum";
import { AgendaConfiguration } from "./agenda-configuration";

export class TrainingAgendaConfiguration implements AgendaConfiguration {
  get availableAgendaPoints(): Map<AgendaPoint, Time> {
    return new Map<AgendaPoint, Time>([
      ...new DefaultAgendaElements().agendaElements,
      ...new TrainingAgendaElements().agendaElements,
    ]);
  }

  get validationPointTypes(): Object[] {
    return new Array<Object>(DefaultAgendaPoint, TrainingAgendaPoint);
  }
  get defaultAgendaPoints(): AgendaPoint[] {
    return new Array<AgendaPoint>(
      DefaultAgendaPoint.LastHRBump,
      DefaultAgendaPoint.ToBed,
      DefaultAgendaPoint.WakeUp,
      TrainingAgendaPoint.PreGymBathroom,
      TrainingAgendaPoint.DriveToGymFromHome,
      TrainingAgendaPoint.WarmUp,
      TrainingAgendaPoint.Workout,
      TrainingAgendaPoint.PostWorkout,
      TrainingAgendaPoint.DriveToOfficeFromGym,
      DefaultAgendaPoint.AtOffice
    );
  }
}
