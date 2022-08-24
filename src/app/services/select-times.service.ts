import { Injectable } from "@angular/core";
import { Time } from "../core/time";
import { DayPlanSettings } from "../settings.service";

@Injectable({ providedIn: "root" })
export class SelectTimesService {
  constructor(public readonly dayPlanSettings: DayPlanSettings) {}

  generateTrainingSelection(): Time[] {
    const topBoundary = this.dayPlanSettings.latestTrainingTime;
    const bottomBoundary = this.dayPlanSettings.earliestTrainingTime;

    return this.generateSelection(bottomBoundary, topBoundary);
  }

  generateAtTomeksSelection(): Time[] {
    const topBoundary = this.dayPlanSettings.latestAtTomeksTime;
    const bottomBoundary = this.dayPlanSettings.earliestAtTomeksTime;

    return this.generateSelection(bottomBoundary, topBoundary);
  }

  generateAtOfficeSelection(): Time[] {
    const topBoundary = this.dayPlanSettings.latestAtOfficeTime;
    const bottomBoundary = this.dayPlanSettings.earliestAtOfficeTime;

    return this.generateSelection(bottomBoundary, topBoundary);
  }

  private generateSelection(bottomBoundary: Time, topBoundary: Time): Time[] {
    const timeIncrements = this.dayPlanSettings.selectionTimesIncrements;
    let time = bottomBoundary;
    const times = new Array<Time>();
    while (time.isEqual(topBoundary) || time.isBefore(topBoundary)) {
      times.push(time);
      time = time.add(timeIncrements);
    }

    return times;
  }
}
