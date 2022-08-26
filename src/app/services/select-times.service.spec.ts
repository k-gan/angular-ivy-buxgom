import { AgendaPointSettings } from "../agenda-point-settings";
import { Time } from "../core/time";
import { DayPlanSettings } from "../settings.service";
import { SelectTimesService } from "./select-times.service";

describe("SelectTimesService", () => {
  const increments = new Time(0, 10);
  const bottomBoundary = new Time(9, 0);
  const upperBoundary = new Time(10, 0);
  const apSetting = new AgendaPointSettings(bottomBoundary, upperBoundary);
  const testSettings = [
    { method: "generateAtOfficeSelection", property: "atOffice" },
    { method: "generateAtTomeksSelection", property: "atTomeks" },
    { method: "generateWorkoutSelection", property: "workout" },
  ];

  for (let testSetting of testSettings) {
    describe(`Test ${testSetting.property}`, () => {
      const expectedSelection = generateSelection(apSetting, increments);
      const settings = createSettings(
        testSetting.property,
        apSetting,
        increments
      );
      const service = new SelectTimesService(settings);
      const actualSelection = service[testSetting.method]();

      it(`${testSetting.method} bottom boundary is set correctly`, () => {
        expect(actualSelection[0].checksum).toEqual(
          expectedSelection[0].checksum
        );
      });

      it(`${testSetting.method} to have correct number of items`, () => {
        expect(actualSelection.length).toEqual(expectedSelection.length);
      });

      it(`${testSetting.method} upper boundary is set correctly`, () => {
        const last = actualSelection.length - 1;
        expect(actualSelection[last].checksum).toEqual(
          expectedSelection[last].checksum
        );
      });

      it(`${testSetting.method} selection is generated correctly`, () => {
        for (const [idx, expSel] of expectedSelection.entries()) {
          const actSel = actualSelection[idx];
          expect(expSel.checksum).toBe(actSel.checksum);
        }
      });
    });
  }

  function createSettings(
    property: string,
    atOffice: AgendaPointSettings,
    increments: Time
  ): DayPlanSettings {
    let settings = jasmine.createSpyObj("DayPlanSettings", [], [property]);
    Object.defineProperty(settings, property, {
      value: atOffice,
    });
    Object.defineProperty(settings, "selectionTimesIncrements", {
      value: increments,
    });

    return settings;
  }

  function generateSelection(
    setting: AgendaPointSettings,
    increments: Time
  ): Time[] {
    const times = new Array<Time>();

    let curTime = setting.earliest;
    while (curTime.isBefore(setting.latest.add(increments))) {
      times.push(curTime);
      curTime = curTime.add(increments);
    }

    return times;
  }
});
