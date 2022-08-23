export class Time {
  private _hours: number;
  public get hours(): number {
    return this._hours;
  }

  private _minutes: number;
  public get minutes(): number {
    return this._minutes;
  }

  get checksum(): number {
    return this._hours * 60 + this._minutes;
  }

  constructor(hours: number, minutes: number) {
    if (hours < 0 || hours > 23)
      throw new Error("Hours need to be in the range of 0 to 23.");
    if (minutes < 0 || minutes > 59)
      throw new Error("Minutes need to be in the range of 0 t 59.");

    this._hours = hours;
    this._minutes = minutes;
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

  add(time: Time): void {
    this._hours += time.hours;
    this._minutes += time.minutes;

    this.validateAndFix();
  }

  subtract(time: Time): void {
    this._hours -= time.hours;
    this._minutes -= time.minutes;

    this.validateAndFix();
  }

  private validateAndFix() {
    if (this._minutes < 0) {
      this._minutes += 60;
      this._hours -= 1;
    }

    if (this._minutes > 59) {
      this._minutes -= 60;
      this._hours += 1;
    }

    if (this._hours > 23) {
      this._hours -= 24;
    }

    if (this._hours < 0) {
      this._hours += 24;
    }
  }
}
