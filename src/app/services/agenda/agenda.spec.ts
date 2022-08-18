import { Agenda } from "./agenda";
import { DefaultAgendaConfiguration } from "./configuration/default-agenda-configuration";
import { TrainingAgendaConfiguration } from "./configuration/training-agenda-configuration";
import { AgendaElement } from "./elements/agenda-element";
import { HomeAgendaPoint } from "./points/home-agenda-point";

describe("Agenda", () => {
  let agenda: Agenda;
  beforeEach(() => {
    agenda = new Agenda(new DefaultAgendaConfiguration());
  });

  it("initialies agenda based on the configuration", () => {
    const configs = [
      new DefaultAgendaConfiguration(),
      new TrainingAgendaConfiguration(),
    ];

    for (let config of configs) {
      const expectedElements = config.defaultAgendaPoints;
      agenda = new Agenda(config);
      const actualElements = agenda.agendaElements.map((a) => a.agenda);

      // `For config type ${config.constructor.name} at index ${i} should contain ${exEl}`
      for (let [i, exEl] of expectedElements.entries()) {
        expect(actualElements[i]).toBe(exEl);
      }
    }
  });

  it("AgendaElements cannot be changed from outside", () => {
    const element = new AgendaElement(HomeAgendaPoint.AtTomeks, {
      hours: 1,
      minutes: 0,
    });
    const elements = agenda.agendaElements;
    elements.push(element);

    expect(elements === agenda.agendaElements).toBeFalse();
    expect(agenda.agendaElements === agenda.agendaElements).toBeFalse();
    expect(agenda.agendaElements.find((e) => e === element)).toBeUndefined();
    expect(elements.find((e) => e === element)).toBeDefined();
  });

  it("AddPointAfter adds point after", () => {
    const pointToAdd = HomeAgendaPoint.Running;
    const startingPointIdx = 0;
    const expectedPointIdx = startingPointIdx + 1;
    const pointToAddAfter = agenda.agendaElements[startingPointIdx].agenda;

    // Verify that this chosen agenda point is not there yet
    const pointAfter = agenda.agendaElements[expectedPointIdx].agenda;
    expect(pointAfter === pointToAdd).toBeFalse();

    // Act
    agenda.addPointAfter(pointToAdd, pointToAddAfter);

    // Assert
    const nowPointAfter = agenda.agendaElements[expectedPointIdx].agenda;
    expect(nowPointAfter === pointToAdd).toBeTrue();
  });

  it("RemoveElement removes the first element, but not the second", () => {
    const firstPointIdx = 0;
    const secondPointIdx = firstPointIdx + 1;
    const firstPoint = agenda.agendaElements[firstPointIdx];
    expect(firstPoint).toBeDefined();

    // Ensure that there is a second point and that it's not first point's duplicate
    expect(agenda.agendaElements[secondPointIdx]).toBeDefined();
    expect(
      agenda.agendaElements[secondPointIdx].agenda === firstPoint.agenda
    ).toBeFalse();

    // Duplicate point
    agenda.addPointAfter(firstPoint.agenda, firstPoint.agenda);
    expect(
      agenda.agendaElements[firstPointIdx].agenda ===
        agenda.agendaElements[secondPointIdx].agenda
    ).toBeTrue();

    // Remove element
    agenda.removeElement(firstPoint.agenda);

    // Ensure there is only one point
    expect(
      agenda.agendaElements[firstPointIdx].agenda === firstPoint.agenda
    ).toBeTrue();
    expect(
      agenda.agendaElements[secondPointIdx].agenda === firstPoint.agenda
    ).toBeFalse();
  });

  it("MoveElement moves element", () => {
    const firstIdx = 0;
    const secondIdx = 1;
    const firstEl = agenda.agendaElements[firstIdx];
    const secondEl = agenda.agendaElements[secondIdx];

    // Make sure these are diff
    expect(firstEl === secondEl).toBeFalse();

    // Swap them around
    agenda.moveElement(firstIdx, secondIdx);

    // Make sure they were swapped
    expect(agenda.agendaElements[firstIdx] === secondEl).toBeTrue();
    expect(agenda.agendaElements[secondIdx] === firstEl).toBeTrue();
  });
});
