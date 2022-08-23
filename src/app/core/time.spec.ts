import { Time } from "./time";

describe("Time", () => {
  const defaultHours = 7;
  const defaultMinutes = 10;
  let time: Time;

  let before: Time;
  let after: Time;
  let equalsBefore: Time;

  beforeEach(() => {
    time = new Time(defaultHours, defaultMinutes);

    before = new Time(7, 20);
    after = new Time(before.hours, before.minutes + 1);
    equalsBefore = new Time(before.hours, before.minutes);
  });

  // Constructor tests
  it("correctly assigns during instantiation", () => {
    expect(time.hours).toEqual(defaultHours);
    expect(time.minutes).toEqual(defaultMinutes);
  });

  it("time throws error when hours lower than 0", () => {
    expect(() => new Time(-1, 0)).toThrowError();
  });

  it("time throws error when hours larger than 23", () => {
    expect(() => new Time(24, 0)).toThrowError();
  });

  it("time throws error when minutes lower than 0", () => {
    expect(() => new Time(1, -1)).toThrowError();
  });

  it("time throws error when minutes larger than 59", () => {
    expect(() => new Time(1, 60)).toThrowError();
  });

  // parse()
  it("parse returns correctly parsed for correct value", () => {
    expect()
  });

  // Checksum
  it("checksum equals to total minutes", () => {
    const expChecksum = time.hours * 60 + time.minutes;

    expect(time.checksum).toEqual(expChecksum);
  });

  // isBefore()
  it("isBefore returns true when supplied is lower", () => {
    expect(before.isBefore(after)).toBeTrue();
  });

  it("isBefore returns false when supplied is higher", () => {
    expect(after.isBefore(before)).toBeFalse();
  });

  it("isBefore returns false when supplied is equal", () => {
    expect(before.isBefore(equalsBefore)).toBeFalse();
  });

  // isAfter()
  it("isAfter returns true when supplied is higher", () => {
    expect(after.isAfter(before)).toBeTrue();
  });

  it("isAfter returns false when supplied is lower", () => {
    expect(before.isAfter(after)).toBeFalse();
  });

  it("isAfter returns false when supplied is equal", () => {
    expect(before.isAfter(equalsBefore)).toBeFalse();
  });

  // isEqual()
  it("isEqual returns false when supplied is higher", () => {
    expect(before.isEqual(after)).toBeFalse();
  });

  it("isEqual returns false when supplied is lower", () => {
    expect(after.isEqual(before)).toBeFalse();
  });

  it("isEqual returns true when supplied is equal", () => {
    expect(before.isEqual(equalsBefore)).toBeTrue();
  });

  // add() hours
  it("add adds hours correctly when sum below 24", () => {
    const expHours = 23;
    const hoursToAdd = expHours - time.hours;
    const timeToAdd = new Time(hoursToAdd, 0);

    const resultTime = time.add(timeToAdd);

    expect(resultTime.hours).toBe(expHours);
  });

  it("adding 1 hour to 23 hours results in 0 hours", () => {
    const baseTime = new Time(23, 0);
    const addTime = new Time(1, 0);
    const expHours = 0;

    const resultTime = baseTime.add(addTime);

    expect(resultTime.hours).toBe(expHours);
  });

  it("adding 2 hours to 23 hours results in 1 hours", () => {
    const baseTime = new Time(23, 0);
    const addTime = new Time(2, 0);
    const expHours = 1;

    const resultTime = baseTime.add(addTime);

    expect(resultTime.hours).toBe(expHours);
  });

  it("adding 23 hours to 23 hours results in 22 hours", () => {
    const baseTime = new Time(23, 0);
    const addTime = new Time(23, 0);
    const expHours = baseTime.hours + addTime.hours - 24;

    const resultTime = baseTime.add(addTime);

    expect(resultTime.hours).toBe(expHours);
  });

  // add() minutes
  it("add adds minutes correctly when sum below 60", () => {
    const expMinutes = 59;
    const minutesToAdd = expMinutes - time.minutes;
    const timeToAdd = new Time(time.hours, minutesToAdd);

    const resultTime = time.add(timeToAdd);

    expect(resultTime.minutes).toBe(expMinutes);
  });

  it("adding 1 minute to 59 minutes results in adding 1 to hours and setting minutes to 0", () => {
    const baseTime = new Time(1, 59);
    const addTime = new Time(0, 1);
    const expTime = new Time(baseTime.hours + 1, 0);

    const resultTime = baseTime.add(addTime);

    expect(resultTime.hours).toBe(expTime.hours);
    expect(resultTime.minutes).toBe(expTime.minutes);
  });

  it("adding 2 minutes to 59 minutes results in 1 minute", () => {
    const baseTime = new Time(1, 59);
    const addTime = new Time(0, 2);
    const expTime = new Time(baseTime.hours + 1, 1);

    const resultTime = baseTime.add(addTime);

    expect(resultTime.hours).toBe(expTime.hours);
    expect(resultTime.minutes).toBe(expTime.minutes);
  });

  it("adding 59 minutes to 59 minutes results in 58 minutes", () => {
    const baseTime = new Time(1, 59);
    const addTime = new Time(0, 59);
    const expTime = new Time(baseTime.hours + 1, 58);

    const resultTime = baseTime.add(addTime);

    expect(resultTime.hours).toBe(expTime.hours);
    expect(resultTime.minutes).toBe(expTime.minutes);
  });

  // subtract() hours
  it("subtract subtracts hours correctly when sum equal or higher than 0", () => {
    const expHours = 0;
    const hoursToSubtract = expHours + time.hours;
    const timeToAdd = new Time(hoursToSubtract, 0);

    const resultTime = time.subtract(timeToAdd);

    expect(resultTime.hours).toBe(expHours);
  });

  it("subracting 1 hour from 0 hours results in 23 hours", () => {
    const baseTime = new Time(0, 0);
    const subtractTime = new Time(1, 0);
    const expHours = 23;

    const resultTime = baseTime.subtract(subtractTime);

    expect(resultTime.hours).toBe(expHours);
  });

  it("subtracting 2 hours from 0 hours results in 22 hours", () => {
    const baseTime = new Time(0, 0);
    const subtractTime = new Time(2, 0);
    const expHours = 22;

    const resultTime = baseTime.subtract(subtractTime);

    expect(resultTime.hours).toBe(expHours);
  });

  it("subtracting 23 hours from 23 hours results in 22 hours", () => {
    const baseTime = new Time(0, 0);
    const subtractTime = new Time(2, 0);
    const expHours = 22;

    const resultTime = baseTime.subtract(subtractTime);

    expect(resultTime.hours).toBe(expHours);
  });

  // subtract() minutes
  it("subtract subtracts minutes correctly when sum equal or higher than 0", () => {
    const expMinutes = 0;
    const minutesToSubtract = expMinutes + time.minutes;
    const timeToSubtract = new Time(0, minutesToSubtract);

    const resultTime = time.subtract(timeToSubtract);

    expect(resultTime.minutes).toBe(expMinutes);
  });

  it("subtracting 1 minute from 0:0 minutes results in 23:59", () => {
    const baseTime = new Time(0, 0);
    const subtractTime = new Time(0, 1);
    const expHours = 23;
    const expMinutes = 59;

    const resultTime = baseTime.subtract(subtractTime);

    expect(resultTime.hours).toBe(expHours);
    expect(resultTime.minutes).toBe(expMinutes);
  });

  it("subtracting 2 minutes from 0:0 results in 23:58", () => {
    const baseTime = new Time(0, 0);
    const subtractTime = new Time(0, 2);
    const expHours = 23;
    const expMinutes = 58;

    const resultTime = baseTime.subtract(subtractTime);

    expect(resultTime.hours).toBe(expHours);
    expect(resultTime.minutes).toBe(expMinutes);
  });

  it("subtracting 59 minutes from 59 minutes results in 0 minutes and the same hours", () => {
    const baseTime = new Time(0, 59);
    const subtractTime = new Time(0, 59);
    const expHours = 0;
    const expMinutes = 0;

    const resultTime = baseTime.subtract(subtractTime);

    expect(resultTime.hours).toBe(expHours);
    expect(resultTime.minutes).toBe(expMinutes);
  });
});
