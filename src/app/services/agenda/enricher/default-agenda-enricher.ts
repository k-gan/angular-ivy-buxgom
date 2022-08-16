import { DayPlanInput } from "../../day-plan-input";
import { Agenda } from "../agenda";
import { DefaultAgendaPoint } from "../default-agenda-point";
import { HomeAgendaPoint } from "../home-agenda-point";
import { AgendaEnricher } from "./agenda-enricher";


export class DefaultAgendaEnricher implements AgendaEnricher {
    enrichAgenda(agenda: Agenda, input: DayPlanInput): Agenda {
        if (input.running) {
            agenda.addPointAfter(HomeAgendaPoint.Running, DefaultAgendaPoint.WakeUp);
        }
        if (input.morningPages) {
            agenda.addPointAfter(DefaultAgendaPoint.MorningPages, DefaultAgendaPoint.WakeUp);
        }

        return agenda;
    }
}
