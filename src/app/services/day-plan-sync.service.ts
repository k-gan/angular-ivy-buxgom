import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DayPlan } from './day-plan';

@Injectable({ providedIn: 'root' })
export class DayPlanSyncService {
  constructor() {}

  // Observable DayPlan sources
  private DayPlanChangedSource = new Subject<DayPlan>();

  // Observable DayPlan streams
  dayPlanChanged$ = this.DayPlanChangedSource.asObservable();

  // Service message commands
  changeDayPlan(dayPlan: DayPlan) {
    this.DayPlanChangedSource.next(dayPlan);
  }
}
