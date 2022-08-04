import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { AgendaElement } from './agenda-element';
import { AgendaPoint } from './agenda-point';

@Injectable({ providedIn: 'root' })
export class AgendaElementCollaterService {
  private baseAgendaElements = new Map<AgendaPoint, Time>();

  registerAgendaElements(agendaElements: Map<AgendaPoint, Time>) {
    this.baseAgendaElements = new Map<AgendaPoint, Time>([
      ...this.baseAgendaElements,
      ...agendaElements,
    ]);
  }

  createAgendaElement(agendaPoint: AgendaPoint): AgendaElement {
    return new AgendaElement(
      agendaPoint,
      this.baseAgendaElements.get(agendaPoint)
    );
  }
}
