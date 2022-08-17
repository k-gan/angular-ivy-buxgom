import { Time } from '@angular/common';

export class DayPlanSettings {
  readonly earliestAtOfficeTime: Time = { hours: 9, minutes: 0 };
  readonly latestAtOfficeTime: Time = { hours: 10, minutes: 30 };
  readonly atOfficeTimeIncrements: Time = { hours: 0, minutes: 15 };
}
