import { AgendaInput } from "../../agenda-input";
import { Agenda } from "../agenda";

export interface AgendaEnricher
{
    enrichAgenda(agenda : Agenda, input : AgendaInput) : Agenda;
}

