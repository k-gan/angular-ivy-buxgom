import { AgendaInput } from "../../agenda-input";
import { Agenda } from "../agenda";
import { DefaultAgendaPoint } from "../points/default-agenda-point";
import { DefaultAgendaEnricher } from "./default-agenda-enricher";
import { HomeAgendaPoint } from "../points/home-agenda-point";
import { AgendaEnricher } from "./agenda-enricher";


export class TomekAgendaEnricher implements AgendaEnricher {
    constructor(private defaultAgendaEnricher: DefaultAgendaEnricher) {
    }

    enrichAgenda(agenda: Agenda, input: AgendaInput): Agenda {
        agenda = this.defaultAgendaEnricher.enrichAgenda(agenda, input);

        const elements = [
            HomeAgendaPoint.DriveToOfficeFromTomeks,
            HomeAgendaPoint.AtTomeks,
            HomeAgendaPoint.DriveToTomeksFromHome,
        ];
        for (let point of elements) {
            agenda.addPointAfter(point, DefaultAgendaPoint.BathroomTime);
        }

        agenda.removeElement(HomeAgendaPoint.DriveToOfficeFromHome);
        return agenda;
    }
}
