/* tslint:disable:no-unused-variable */

import { inject, TestBed } from "@angular/core/testing";
import { AgendaNameService } from "./agenda-name.service";

describe("Service: AgendaName", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgendaNameService],
    });
  });

  it("returns Monday when no value passed", inject(
    [AgendaNameService],
    (service: AgendaNameService) => {
      verifyValue(service, "Monday");
    }
  ));

  it("returns Monday for non-existant value", inject(
    [AgendaNameService],
    (service: AgendaNameService) => {
      verifyValue(service, "Monday", "ffff");
    }
  ));

  it("returns correct values", inject(
    [AgendaNameService],
    (service: AgendaNameService) => {
      const valuePairs = new Map<string, string>([
        ["Monday", "Tuesday"],
        ["Tuesday", "Wednesday"],
        ["Wednesday", "Thursday"],
        ["Thursday", "Friday"],
        ["Friday", "Monday"],
      ]);

      for (let pair of valuePairs) {
        verifyValue(service, pair[1], pair[0]);
      }
    }
  ));

  function verifyValue(
    service: AgendaNameService,
    expected: string,
    value?: string
  ) {
    const name = service.getNext(value);
    expect(name).toBe(expected);
  }
});
