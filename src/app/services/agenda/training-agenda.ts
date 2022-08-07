import { Agenda } from './agenda';
import { AgendaElement } from './agenda-element';
import { AgendaPoint } from './agenda-point';
import { DefaultAgendaElements } from './default-agenda-elements';
import { DefaultAgendaPoint } from './default-agenda-point';
import { TrainingAgendaElements } from './training-agenda-elements';
import { TrainingAgendaPoint } from './training-agenda-point.enum';

export class TrainingAgenda extends Agenda {
  protected registerAgendaElements(): void {
    this.agendaElementCollater.registerAgendaElements(
      new DefaultAgendaElements().agendaElements
    );
    this.agendaElementCollater.registerAgendaElements(
      new TrainingAgendaElements().agendaElements
    );
  }
  protected pointTypesToValidate(): Object[] {
    return new Array<Object>(DefaultAgendaPoint, TrainingAgendaPoint);
  }
  protected agendaPoints(): Array<AgendaPoint> {
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
