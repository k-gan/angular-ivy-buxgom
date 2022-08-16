import { AgendaInput } from "../../agenda-input";
import { Agenda } from "../agenda";
import { DefaultAgendaPoint } from "../points/default-agenda-point";
import { HomeAgendaPoint } from "../points/home-agenda-point";
import { AgendaEnricher } from "./agenda-enricher";


export class DefaultAgendaEnricher implements AgendaEnricher {
    enrichAgenda(agenda: Agenda, input: AgendaInput): Agenda {
        if (input.running) {
            agenda.addPointAfter(HomeAgendaPoint.Running, DefaultAgendaPoint.WakeUp);
        }
        if (input.morningPages) {
            agenda.addPointAfter(DefaultAgendaPoint.MorningPages, DefaultAgendaPoint.WakeUp);
        }

        return agenda;
    }
}
