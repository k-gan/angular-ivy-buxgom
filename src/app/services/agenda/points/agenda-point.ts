import { DefaultAgendaPoint } from "./default-agenda-point";
import { HomeAgendaPoint } from "./home-agenda-point";
import { WorkoutAgendaPoint } from "./workout-agenda-point.enum";

export type AgendaPoint =
  | DefaultAgendaPoint
  | HomeAgendaPoint
  | WorkoutAgendaPoint;
