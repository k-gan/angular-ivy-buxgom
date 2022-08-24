import { Injectable } from "@angular/core";
import { AgendaPointSettings } from "./AgendaPointSettings";
import { Time } from "./core/time";

@Injectable({ providedIn: "root" })
export class DayPlanSettings {
  readonly atOffice: AgendaPointSettings = new AgendaPointSettings(
    new Time(9, 0),
    new Time(10, 30)
  );
  readonly atTomeks: AgendaPointSettings = new AgendaPointSettings(
    new Time(8, 30),
    new Time(9, 45)
  );
  readonly workout: AgendaPointSettings = new AgendaPointSettings(
    new Time(6, 0),
    new Time(9, 0),
    new Time(7, 0)
  );

  readonly selectionTimesIncrements: Time = new Time(0, 15);
}
