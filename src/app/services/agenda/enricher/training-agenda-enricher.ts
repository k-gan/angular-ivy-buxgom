import { DayPlanInput } from "../../day-plan-input";
import { Agenda } from "../agenda";
import { DefaultAgendaPoint } from "../default-agenda-point";
import { AgendaEnricher } from "./agenda-enricher";


export class TrainingAgendaEnricher implements AgendaEnricher {
    enrichAgenda(agenda: Agenda, input: DayPlanInput): Agenda {
        if (input.running) {
            console.log('Running is not possible when in training mode.');
        }
        if (input.morningPages) {
            agenda.addPointAfter(DefaultAgendaPoint.MorningPages, DefaultAgendaPoint.AtWork);
        }

        return agenda;
    }

}
