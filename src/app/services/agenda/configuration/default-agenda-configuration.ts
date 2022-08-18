import { Time } from "@angular/common";
import { DefaultAgendaElements } from "../elements/default-agenda-elements";
import { HomeAgendaElements } from "../elements/home-agenda-elements";
import { AgendaPoint } from "../points/agenda-point";
import { DefaultAgendaPoint } from "../points/default-agenda-point";
import { HomeAgendaPoint } from "../points/home-agenda-point";
import { AgendaConfiguration } from "./agenda-configuration";

export class DefaultAgendaConfiguration implements AgendaConfiguration {
  get defaultAgendaPoints(): AgendaPoint[] {
    return new Array<AgendaPoint>(
      DefaultAgendaPoint.LastHRBump,
      DefaultAgendaPoint.ToBed,
      DefaultAgendaPoint.WakeUp,
      DefaultAgendaPoint.BathroomTime,
      HomeAgendaPoint.DriveToOfficeFromHome,
      DefaultAgendaPoint.AtOffice
    );
  }

  get validationPointTypes(): Object[] {
    return new Array<Object>(DefaultAgendaPoint, HomeAgendaPoint);
  }

  get availableAgendaPoints(): Map<AgendaPoint, Time> {
    return new Map<AgendaPoint, Time>([
      ...new DefaultAgendaElements().agendaElements,
      ...new HomeAgendaElements().agendaElements,
    ]);
  }
}
