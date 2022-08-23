export class Time {
  get checksum(): number {
    return this.hours * 60 + this.minutes;
  }

  static parse(str: string): Time {
    const parts = str.split(":");
    const hours = parseInt(parts[0]);
    const minutes = parts.length > 1 ? parseInt(parts[1]) : 0;

    return new Time(hours, minutes);
  }

  constructor(public readonly hours: number, public readonly minutes: number) {
    if (hours < 0 || hours > 23)
      throw new Error("Hours need to be in the range of 0 to 23.");
    if (minutes < 0 || minutes > 59)
      throw new Error("Minutes need to be in the range of 0 t 59.");
  }

  isBefore(after: Time): boolean {
    return this.checksum < after.checksum;
  }

  isAfter(before: Time): boolean {
    return this.checksum > before.checksum;
  }

  isEqual(time: Time) {
    return this.checksum === time.checksum;
  }

  add(time: Time): Time {
    const hours = this.hours + time.hours;
    const minutes = this.minutes + time.minutes;

    return this.validateAndFix(hours, minutes);
  }

  subtract(time: Time): Time {
    const hours = this.hours - time.hours;
    const minutes = this.minutes - time.minutes;

    return this.validateAndFix(hours, minutes);
  }

  private validateAndFix(hours: number, minutes: number): Time {
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }

    if (minutes > 59) {
      minutes -= 60;
      hours += 1;
    }

    if (hours > 23) {
      hours -= 24;
    }

    if (hours < 0) {
      hours += 24;
    }

    return new Time(hours, minutes);
  }
}
