import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Agenda } from './agenda/agenda';

@Injectable({ providedIn: 'root' })
export class AgendaSynchronizeService {
  private agendaChangedSource = new Subject<Agenda>();

  // Observable Agenda streams
  agendaChanged$ = this.agendaChangedSource.asObservable();

  // Service message commands
  changeAgenda(agenda: Agenda) {
    this.agendaChangedSource.next(agenda);
  }
}
