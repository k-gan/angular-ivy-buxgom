import { Agenda } from './agenda';
import { AgendaElement } from './agenda-element';
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
  protected initializeAgenda(): void {
    this.agenda = [
      this.agendaElementCollater.createAgendaElement(
        DefaultAgendaPoint.LastHRBump
      ),
      this.agendaElementCollater.createAgendaElement(DefaultAgendaPoint.ToBed),
      this.agendaElementCollater.createAgendaElement(DefaultAgendaPoint.WakeUp),
      this.agendaElementCollater.createAgendaElement(
        TrainingAgendaPoint.PreGymBathroom
      ),
      this.agendaElementCollater.createAgendaElement(
        TrainingAgendaPoint.DriveToGymFromHome
      ),
      this.agendaElementCollater.createAgendaElement(
        TrainingAgendaPoint.WarmUp
      ),
      this.agendaElementCollater.createAgendaElement(
        TrainingAgendaPoint.Workout
      ),
      this.agendaElementCollater.createAgendaElement(
        TrainingAgendaPoint.PostWorkout
      ),
      this.agendaElementCollater.createAgendaElement(
        TrainingAgendaPoint.DriveToOfficeFromGym
      ),
      this.agendaElementCollater.createAgendaElement(DefaultAgendaPoint.AtWork),
      this.agendaElementCollater.createAgendaElement(
        DefaultAgendaPoint.MorningPages
      ),
    ];
  }
}
