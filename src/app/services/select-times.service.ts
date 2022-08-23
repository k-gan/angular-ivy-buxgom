import { Time } from "@angular/common";
import { Injectable } from "@angular/core";
import { DateTimeModifiers } from "../core/DateTimeModifiers";
import { DayPlanSettings } from "../settings.service";

@Injectable({ providedIn: "root" })
export class SelectTimesService {
  constructor(public readonly dayPlanSettings: DayPlanSettings) {}

  generateTrainingSelection(): Time[] {
    const topBoundary = this.dayPlanSettings.latestTrainingTime;
    const bottomBoundary = this.dayPlanSettings.earliestTrainingTime;

    return this.generateSelection(bottomBoundary, topBoundary);
  }

  generateTomeksSelection(): Time[] {
    const topBoundary = this.dayPlanSettings.latestTomeksTime;
    const bottomBoundary = this.dayPlanSettings.earliestTomeksTime;

    return this.generateSelection(bottomBoundary, topBoundary);
  }

  generateAtOfficeSelection(): Time[] {
    const topBoundary = this.dayPlanSettings.latestAtOfficeTime;
    const bottomBoundary = this.dayPlanSettings.earliestAtOfficeTime;

    return this.generateSelection(bottomBoundary, topBoundary);
  }

  private generateSelection(bottomBoundary: Time, topBoundary: Time): Time[] {
    const endDate = DateTimeModifiers.createTodayDateWithTime(topBoundary);
    let startDate = DateTimeModifiers.createDateWithTime(
      endDate,
      bottomBoundary
    );

    const times = new Array<Time>();
    while (startDate <= endDate) {
      let time: Time = {
        hours: startDate.getHours(),
        minutes: startDate.getMinutes(),
      };
      times.push(time);

      startDate = DateTimeModifiers.addTimeToDate(
        startDate,
        this.dayPlanSettings.selectionTimesIncrements
      );
    }

    return times;
  }
}
