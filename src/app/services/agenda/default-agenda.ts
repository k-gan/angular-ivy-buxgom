import { Agenda } from './agenda';
import { AgendaPoint } from './agenda-point';
import { DefaultAgendaElements } from './default-agenda-elements';
import { DefaultAgendaPoint } from './default-agenda-point';
import { HomeAgendaElements } from './home-agenda-elements';
import { HomeAgendaPoint } from './home-agenda-point';

export class DefaultAgenda extends Agenda {
  protected registerAgendaElements(): void {
    this.agendaElementCollater.registerAgendaElements(
      new DefaultAgendaElements().agendaElements
    );
    this.agendaElementCollater.registerAgendaElements(
      new HomeAgendaElements().agendaElements
    );
  }

  protected pointTypesToValidate(): Object[] {
    return new Array<Object>(DefaultAgendaPoint, HomeAgendaPoint);
  }

  protected agendaPoints(): Array<AgendaPoint> {
    return new Array<AgendaPoint>(
      DefaultAgendaPoint.LastHRBump,
      DefaultAgendaPoint.ToBed,
      DefaultAgendaPoint.WakeUp,
      DefaultAgendaPoint.BathroomTime,
      HomeAgendaPoint.DriveToOfficeFromHome,
      DefaultAgendaPoint.AtWork
    );
  }
}
