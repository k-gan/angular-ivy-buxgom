import { Time } from "@angular/common";

export function printTime(time: Time): string {
  return time.hours + ":" + ("00" + time.minutes).slice(-2);
}

export function convertStringToTime(val: string): Time {
  const parts = val.split(":");
  const hours = parseInt(parts[0]);
  const minutes = parts.length > 1 ? parseInt(parts[1]) : 0;

  return { hours: hours, minutes: minutes };
}

export function addTimes(time1: Time, time2: Time): Time {
  const date = DateTimeModifiers.createTodayDateWithTime(time1);
  const resultDate = DateTimeModifiers.addTimeToDate(date, time2);
  return DateTimeModifiers.convertDateToTime(resultDate);
}

export function compareTimes(time1: Time, time2: Time): number {
  const time1Checksum = generateTimeChecksum(time1);
  const time2Checksum = generateTimeChecksum(time2);

  if (time1Checksum < time2Checksum) return -1;
  if (time1Checksum === time2Checksum) return 0;
  return 1;
}

export function generateTimeChecksum(time: Time) {
  return time.hours * 60 + time.minutes;
}

export class DateTimeModifiers {
  static createTodayDateWithTime(time: Time): Date {
    const today: Date = new Date();
    return this.createDateWithTime(today, time);
  }

  static createDateWithTime(fromDate: Date, time: Time): Date {
    return new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDay(),
      time.hours,
      time.minutes
    );
  }

  static addTimeToDate(fromDate: Date, time: Time): Date {
    const internalDate = new Date(fromDate);
    internalDate.setHours(internalDate.getHours() + time.hours);
    internalDate.setMinutes(internalDate.getMinutes() + time.minutes);

    return internalDate;
  }

  static decreaseTime(initial: Time, toSubtract: Time): Time {
    const initialDate: Date =
      DateTimeModifiers.createTodayDateWithTime(initial);
    const resultDate: Date = this.decreaseDateTime(initialDate, toSubtract);
    return DateTimeModifiers.convertDateToTime(resultDate);
  }

  static decreaseDateTime(initial: Date, toSubtract: Time): Date {
    let decreasedDateTime = new Date(initial);
    decreasedDateTime.setHours(decreasedDateTime.getHours() - toSubtract.hours);
    decreasedDateTime.setMinutes(
      decreasedDateTime.getMinutes() - toSubtract.minutes
    );

    return decreasedDateTime;
  }

  static convertDateToTime(date: Date): Time {
    return { hours: date.getHours(), minutes: date.getMinutes() };
  }
}
