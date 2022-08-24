import { AgendaType } from "../agenda-type";
import { AgendaConfiguration } from "./agenda-configuration";
import { AgendaConfigurationService } from "./agenda-configuration.service";
import { DefaultAgendaConfiguration } from "./default-agenda-configuration";
import { WorkoutAgendaConfiguration } from "./workout-agenda-configuration";

describe("AgendaConfigurationService", () => {
  const agendaConfigMap = new Map<AgendaType, AgendaConfiguration>([
    [AgendaType.Default, new DefaultAgendaConfiguration()],
    [AgendaType.Tomek, new DefaultAgendaConfiguration()],
    [AgendaType.Workout, new WorkoutAgendaConfiguration()],
  ]);

  const provider = new AgendaConfigurationService();

  for (let map of agendaConfigMap) {
    const agendaType = map[0];
    const expectedConfigType = map[1].constructor.name;
    const actualConfig = provider.getConfiguration(agendaType);
    const actualConfigType = actualConfig.constructor.name;

    it(`For ${agendaType} agenda type, config type is expected to be ${expectedConfigType}.`, () => {
      expect(actualConfigType).toBe(expectedConfigType);
    });
  }
});
