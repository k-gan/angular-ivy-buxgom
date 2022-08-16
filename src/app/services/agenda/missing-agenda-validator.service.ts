import { Injectable } from '@angular/core';
import { AgendaElement } from './elements/agenda-element';

// It might be a good idea to delete this at some point.
// This should probably be run as a test, not as part of runtime.
@Injectable({ providedIn: 'root' })
export class MissingAgendaValidatorService {
  constructor() {}

  public validateAgenda(
    pointTypesToValidate: Array<Object>,
    agendaElements: Array<AgendaElement>
  ) {
    for (let points of pointTypesToValidate) {
      const availablePoints: Array<string> = Object.values(points);
      const usedPoints: Array<string> = agendaElements.map((aEl) => aEl.agenda);
      const unusedPoints: Array<string> = this.findUnusedPoints(
        availablePoints,
        usedPoints
      );

      this.notifyAboutUnusedPoints(unusedPoints);
    }
  }

  private findUnusedPoints(
    availablePoints: string[],
    usedPoints: string[]
  ): string[] {
    return availablePoints.filter(
      (ap) => usedPoints.findIndex((up) => up === ap) < 0
    );
  }

  private notifyAboutUnusedPoints(unusedPoints: string[]) {
    if (unusedPoints.length <= 0) return;

    console.log(
      `Unused points in (${this.constructor.name}): ${JSON.stringify(
        unusedPoints
      )}`
    );
  }
}
