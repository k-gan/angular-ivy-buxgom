import { DefaultAgendaPoint } from './default-agenda-point';
import { HomeAgendaPoint } from './home-agenda-point';
import { TrainingAgendaPoint } from './training-agenda-point.enum';

export type AgendaPoint =
  | DefaultAgendaPoint
  | HomeAgendaPoint
  | TrainingAgendaPoint;
