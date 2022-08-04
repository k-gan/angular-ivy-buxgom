import { DayPlan } from './day-plan';

export enum DayPlanAgenda {
  Training,
  MorningPages,
  Running,
  LastHRBump,
  ToBed,
  WakeUp,
  BathroomTime,
  DriveToWork,
  AtWork,
}

export class CoreDayPlanAgenda {
  private readonly wrappedAgenda: Array<DayPlanAgenda> = [
    DayPlanAgenda.LastHRBump,
    DayPlanAgenda.ToBed,
    DayPlanAgenda.WakeUp,
    DayPlanAgenda.AtWork,
  ];

  get agenda(): Array<DayPlanAgenda> {
    return this.wrappedAgenda.slice();
  }
}
