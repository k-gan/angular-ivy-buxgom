import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AgendaNameService {
  private readonly workdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  getNext(current?: string): string {
    let idx = this.workdays.findIndex((w) => w === current);
    if (idx >= 0) idx = idx + 1;
    if (idx < 0 || idx >= this.workdays.length) idx = 0;

    return this.workdays[idx];
  }
}
