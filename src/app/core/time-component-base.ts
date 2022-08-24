import { Time } from "@angular/common";

export abstract class TimeComponentBase {
  printTime(time: Time): string {
    if (time === undefined || time === null) return "";

    return `${time.hours}:${("00" + time.minutes).slice(-2)}`;
  }
}
