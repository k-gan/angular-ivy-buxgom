import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateTimeModifiers } from '../core/DateTimeModifiers';
import { DayPlanSettings } from '../settings';

@Injectable({ providedIn: 'root' })
export class AtOfficeTimesProviderService {
  private _dayPlanSettings: DayPlanSettings = new DayPlanSettings();
  public get dayPlanSettings(): DayPlanSettings {
    return this._dayPlanSettings;
  }

  public generateAtOfficeSelection(): Time[] {
    const endDate = DateTimeModifiers.createTodayDateWithTime(
      this.dayPlanSettings.latestAtOfficeTime
    );

    let startDate = DateTimeModifiers.createDateWithTime(
      endDate,
      this.dayPlanSettings.earliestAtOfficeTime
    );

    const atOfficeTimes = new Array<Time>();
    while (startDate <= endDate) {
      let time: Time = {
        hours: startDate.getHours(),
        minutes: startDate.getMinutes(),
      };
      atOfficeTimes.push(time);

      startDate = DateTimeModifiers.addTimeToDate(
        startDate,
        this._dayPlanSettings.atOfficeTimeIncrements
      );
    }

    return atOfficeTimes;
  }
}
