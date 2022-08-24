import { AgendaType } from "./agenda-type";
import { AgendaEnricherService } from "./enrichers/agenda-enricher.service";
import { DefaultAgendaEnricher } from "./enrichers/default-agenda-enricher";
import { TomekAgendaEnricher } from "./enrichers/tomek-agenda-enricher";
import { WorkoutAgendaEnricher } from "./enrichers/workout-agenda-enricher";

describe("AgendaFactoryService", () => {
  const enricherMap: Map<AgendaType, string> = new Map<AgendaType, string>([
    [AgendaType.Default, DefaultAgendaEnricher.name],
    [AgendaType.Tomek, TomekAgendaEnricher.name],
    [AgendaType.Workout, WorkoutAgendaEnricher.name],
  ]);

  const provider = new AgendaEnricherService();

  for (let map of enricherMap) {
    const agendaType = map[0];
    const expectedEnricherType = map[1];

    it(`For ${agendaType} agenda type, expect ${expectedEnricherType} enricher.`, () => {
      const enricher = provider.getEnricher(agendaType);
      const actualEnricherType = enricher.constructor.name;

      expect(expectedEnricherType).toBe(actualEnricherType);
    });
  }
});
