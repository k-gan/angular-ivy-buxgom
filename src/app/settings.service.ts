import { Injectable } from "@angular/core";
import { Time } from "./core/time";

@Injectable({ providedIn: "root" })
export class DayPlanSettings {
  readonly earliestAtOfficeTime: Time = new Time(9, 0);
  readonly latestAtOfficeTime: Time = new Time(10, 30);

  readonly earliestAtTomeksTime: Time = new Time(8, 30);
  readonly latestAtTomeksTime: Time = new Time(9, 45);

  readonly defaultTrainingTime: Time = new Time(7, 0);
  readonly earliestTrainingTime: Time = new Time(6, 0);
  readonly latestTrainingTime: Time = new Time(9, 0);

  readonly selectionTimesIncrements: Time = new Time(0, 15);
}
