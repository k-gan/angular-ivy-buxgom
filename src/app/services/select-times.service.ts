import { Injectable } from "@angular/core";
import { AgendaPointSettings } from "../agenda-point-settings";
import { Time } from "../core/time";
import { DayPlanSettings } from "../settings.service";

@Injectable({ providedIn: "root" })
export class SelectTimesService {
  constructor(public readonly dayPlanSettings: DayPlanSettings) {}

  generateWorkoutSelection(): Time[] {
    return this.generateSelection(this.dayPlanSettings.workout);
  }

  generateAtTomeksSelection(): Time[] {
    return this.generateSelection(this.dayPlanSettings.atTomeks);
  }

  generateAtOfficeSelection(): Time[] {
    return this.generateSelection(this.dayPlanSettings.atOffice);
  }

  private generateSelection(settings: AgendaPointSettings): Time[] {
    const timeIncrements = this.dayPlanSettings.selectionTimesIncrements;
    let time = settings.earliest;
    const times = new Array<Time>();
    while (time.isEqual(settings.latest) || time.isBefore(settings.latest)) {
      times.push(time);
      time = time.add(timeIncrements);
    }

    return times;
  }
}
