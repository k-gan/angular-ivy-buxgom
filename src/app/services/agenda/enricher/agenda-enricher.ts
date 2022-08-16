import { DayPlanInput } from "../../day-plan-input";
import { Agenda } from "../agenda";

export interface AgendaEnricher
{
    enrichAgenda(agenda : Agenda, input : DayPlanInput) : Agenda;
}

