import { Time } from "@angular/common";

export abstract class TimeComponentBase {
  printTime(time: Time): string {
    return `${time.hours}:${("00" + time.minutes).slice(-2)}`;
  }
}
