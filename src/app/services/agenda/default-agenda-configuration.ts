import { Time } from "@angular/common";
import { AgendaPoint } from "./agenda-point";
import { AgendaConfiguration } from "./agenda-configuration";
import { DefaultAgendaElements } from "./default-agenda-elements";
import { DefaultAgendaPoint } from "./default-agenda-point";
import { HomeAgendaElements } from "./home-agenda-elements";
import { HomeAgendaPoint } from "./home-agenda-point";


export class DefaultAgendaConfiguration implements AgendaConfiguration {
    get defaultAgendaPoints(): AgendaPoint[] {
        return new Array<AgendaPoint>(
            DefaultAgendaPoint.LastHRBump,
            DefaultAgendaPoint.ToBed,
            DefaultAgendaPoint.WakeUp,
            DefaultAgendaPoint.BathroomTime,
            HomeAgendaPoint.DriveToOfficeFromHome,
            DefaultAgendaPoint.AtWork
        );
    }

    get validationPointTypes(): Object[] {
        return new Array<Object>(DefaultAgendaPoint, HomeAgendaPoint);
    }

    get availableAgendaPoints(): Map<AgendaPoint, Time> {
        return new Map<AgendaPoint, Time>([...new DefaultAgendaElements().agendaElements, ...new HomeAgendaElements().agendaElements]);
    }
}


