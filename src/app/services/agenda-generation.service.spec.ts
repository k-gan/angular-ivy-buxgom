import { TestBed } from "@angular/core/testing";
import { Time } from "../core/time";
import { AgendaGenerationService } from "./agenda-generation.service";
import { AgendaInput } from "./agenda-input";
import { AgendaFactoryService } from "./agenda/agenda-factory.service";
import { AgendaType } from "./agenda/agenda-type";
import { AgendaEnricherService } from "./agenda/enrichers/agenda-enricher.service";

describe("Agenda Generation Service", () => {
  // agenda factory service
  // agenda enricher
  let agendaEnricher; // do this as in createsettings
  TestBed.configureTestingModule({
    providers: [AgendaFactoryService, AgendaEnricherService],
  });

  let service: AgendaGenerationService;
  beforeEach(() => {
    service = new AgendaGenerationService(
      TestBed.inject(AgendaFactoryService),
      TestBed.inject(AgendaEnricherService)
    );
  });

  describe("Generate agenda", () => {
    it("Sets name correctly", () => {
      const label = "testLabel";
      const input = new AgendaInput(label, AgendaType.Default, new Time(9, 0));
      const agenda = service.createEnrichedAgenda(input);
      expect(agenda.name).toEqual(label);
    });

    it("Sets agenda type correctly", () => {
      const agendaType = AgendaType.Tomek;
      const input = new AgendaInput("", agendaType, new Time(9, 0));
      const expAgenda =
        TestBed.inject(AgendaFactoryService).createAgenda(agendaType);
      const agenda = service.createEnrichedAgenda(input);

      //   for (let [idx, actPoint] of agenda.agendaElements.entries()) {
      //     const expPoint = expPoints[idx];

      //     expect(expPoint.agenda).toEqual(actPoint.agenda);
      //     expect(expPoint.duration).toEqual(actPoint.duration);
      //     expect(expPoint.name).toEqual(actPoint.name);
      //   }

      //   console.log(agenda.agendaElements);
      //   console.log(expAgenda.agendaElements);

      for (let expPoint of expAgenda.agendaElements) {
        const actPoint = agenda.agendaElements.find(
          (e) => e.agenda === expPoint.agenda
        );
        // expect(actPoint).toBeDefined();
        // expect(actPoint.agenda).toEqual(expPoint.agenda);
        // expect(actPoint.duration).toEqual(expPoint.duration);
        // expect(actPoint.name).toEqual(expPoint.name);
      }
    });

    it("Constructor sets agenda type correctly", () => {
      const agendaType = AgendaType.Tomek;
      const input = new AgendaInput("", agendaType, new Time(9, 0));

      expect(input.agendaType).toEqual(agendaType);
    });
  });
});
