import { AgendaType } from "../agenda-type";
import { AgendaConfiguration } from "./agenda-configuration";
import { AgendaConfigurationProviderService } from "./agenda-configuration-provider.service";
import { DefaultAgendaConfiguration } from "./default-agenda-configuration";
import { TrainingAgendaConfiguration } from "./training-agenda-configuration";

describe("AgendaConfigurationProviderService", () => {
    const agendaConfigMap = new Map<AgendaType, AgendaConfiguration>([
        [AgendaType.Default, new DefaultAgendaConfiguration()],
        [AgendaType.Tomek, new DefaultAgendaConfiguration()],
        [AgendaType.Training, new TrainingAgendaConfiguration()]
      ]);

      const provider = new AgendaConfigurationProviderService();

      for (let map of agendaConfigMap) {
        const agendaType = map[0];
        const expectedConfigType = map[1].constructor.name;
        const actualConfig = provider.getConfiguration(agendaType);
        const actualConfigType = actualConfig.constructor.name;

        console.log(actualConfigType);

        it(`For ${ agendaType } agenda type, config type is expected to be ${ expectedConfigType }.`, () => {
            expect(actualConfigType).toBe(expectedConfigType);
        });
      }
});
