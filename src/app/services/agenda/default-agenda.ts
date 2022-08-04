import { Agenda } from './agenda';
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

  protected initializeAgenda(): void {
    this.agenda = [
      this.agendaElementCollater.createAgendaElement(
        DefaultAgendaPoint.LastHRBump
      ),
      this.agendaElementCollater.createAgendaElement(DefaultAgendaPoint.ToBed),
      this.agendaElementCollater.createAgendaElement(DefaultAgendaPoint.WakeUp),
      this.agendaElementCollater.createAgendaElement(
        DefaultAgendaPoint.BathroomTime
      ),
      this.agendaElementCollater.createAgendaElement(
        HomeAgendaPoint.DriveToOfficeFromHome
      ),
      this.agendaElementCollater.createAgendaElement(DefaultAgendaPoint.AtWork),
    ];
  }
}
