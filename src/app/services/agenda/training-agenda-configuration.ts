import { Time } from "@angular/common";
import { AgendaPoint } from "./agenda-point";
import { AgendaConfiguration } from "./agenda-configuration";
import { DefaultAgendaElements } from "./default-agenda-elements";
import { DefaultAgendaPoint } from "./default-agenda-point";
import { TrainingAgendaPoint } from "./training-agenda-point.enum";
import { TrainingAgendaElements } from "./training-agenda-elements";


export class TrainingAgendaConfiguration implements AgendaConfiguration {
    get availableAgendaPoints(): Map<AgendaPoint, Time> {
        return new Map<AgendaPoint, Time>([...new DefaultAgendaElements().agendaElements, ...new TrainingAgendaElements().agendaElements]);
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
            DefaultAgendaPoint.AtWork
        );
    }
}
