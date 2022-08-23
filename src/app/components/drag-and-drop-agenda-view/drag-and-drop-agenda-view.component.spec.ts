import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Time } from "src/app/core/time";
import { AgendaInput } from "src/app/services/agenda-input";
import { AgendaType } from "src/app/services/agenda/agenda-type";
import { AgendaConfigurationService } from "src/app/services/agenda/configuration/agenda-configuration.service";
import { AgendaElement } from "src/app/services/agenda/elements/agenda-element";
import { AgendaEnricherService } from "src/app/services/agenda/enrichers/agenda-enricher.service";
import { DayPlan } from "src/app/services/day-plan";
import { AgendaGenerationService } from "../../services/agenda-generation.service";
import { AgendaFactoryService } from "../../services/agenda/agenda-factory.service";
import { DragAndDropAgendaViewComponent } from "./drag-and-drop-agenda-view.component";

function printTime(time: Time) {
  return `${time.hours}:${("00" + time.minutes).slice(-2)}`;
}

// Still no tests for regenerating day plan on save/drop
describe("DragAndDropAgendaViewComponent", () => {
  let component: DragAndDropAgendaViewComponent;
  let fixture: ComponentFixture<DragAndDropAgendaViewComponent>;
  let dayPlan: DayPlan;
  let drop: CdkDragDrop<AgendaElement[]>;

  let agendaGeneration: AgendaGenerationService = new AgendaGenerationService(
    new AgendaFactoryService(new AgendaConfigurationService()),
    new AgendaEnricherService()
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DragAndDropAgendaViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropAgendaViewComponent);
    component = fixture.componentInstance;

    drop = {
      previousIndex: undefined,
      currentIndex: undefined,
      container: undefined,
      item: undefined,
      previousContainer: undefined,
      isPointerOverContainer: undefined,
      distance: undefined,
      dropPoint: undefined,
      event: undefined,
    };

    const agendaType = AgendaType.Default;
    const atOffice = new Time(9, 0);
    const agendaInput = new AgendaInput(
      "label",
      agendaType,
      false,
      false,
      atOffice
    );

    const agenda = agendaGeneration.generateAgenda(agendaInput);
    dayPlan = new DayPlan(agenda);
    dayPlan.generateFromAgenda();

    component.dayPlan = dayPlan;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("agenda returns dayplan's agenda", () => {
    expect(component.agenda === dayPlan.agenda).toBeTrue();
  });

  it("edit correctly sets editedElement and editedDuration", () => {
    // Arrange
    const element = dayPlan.agenda.agendaElements[0];
    const expDuration = printTime(element.duration);

    // Act
    component.edit(element);

    // Assert
    expect(component.editedElement).toEqual(element);
    expect(component.editedDuration).toEqual(expDuration);
  });

  it("cancelEdit cleans editedElement and editedDruation", () => {
    // Arrange
    component.edit(dayPlan.agenda.agendaElements[0]);

    // Act
    component.cancelEdit();

    // Assert
    expect(component.editedDuration).toBeUndefined();
    expect(component.editedElement).toBeUndefined();
  });

  it("save sets duration correctly", () => {
    // Arrange
    const el = dayPlan.agenda.agendaElements[0];
    const duration = new Time(el.duration.hours + 1, 0);
    component.edit(el);

    // Act
    component.editedDuration = printTime(duration);
    component.save();

    // Assert
    expect(el.duration.hours).toEqual(duration.hours);
    expect(el.duration.minutes).toEqual(duration.minutes);
  });

  it("save cancelsEdit", () => {
    // Arrange
    component.edit(dayPlan.agenda.agendaElements[0]);

    // Act
    component.save();

    // Assert
    expect(component.editedDuration).toBeUndefined();
    expect(component.editedElement).toBeUndefined();
  });

  it("save regenrates agenda", () => {
    // Arrange
    const el = dayPlan.agenda.agendaElements[0];
    const shift = 1;
    const duration = new Time(el.duration.hours + shift, el.duration.minutes);
    const expStarTime = new Time(
      el.startTime.hours - shift,
      el.startTime.minutes
    );
    component.edit(el);

    // Act
    component.editedDuration = printTime(duration);
    component.save();

    // Assert
    expect(el.startTime.hours).toEqual(expStarTime.hours);
    expect(el.startTime.minutes).toEqual(expStarTime.minutes);
  });

  it("drop moves element in list", () => {
    // Arrange
    const firstElIdx = 0;
    const secondElIdx = 1;
    const firstEl = dayPlan.agenda.agendaElements[firstElIdx];
    const secondEl = dayPlan.agenda.agendaElements[secondElIdx];
    drop.previousIndex = firstElIdx;
    drop.currentIndex = secondElIdx;

    // Act
    component.drop(drop);
    const resFirstIdx = component.agenda.agendaElements.findIndex(
      (e) => e === firstEl
    );
    const resSecondIdx = component.agenda.agendaElements.findIndex(
      (e) => e === secondEl
    );

    // Assert
    expect(resFirstIdx).toBe(secondElIdx);
    expect(resSecondIdx).toBe(firstElIdx);
  });

  it("drop regenerates agenda", () => {
    // Arrange
    const prevIdx = 0;
    const curIdx = 1;

    // Swap first and second elements
    drop.previousIndex = prevIdx;
    drop.currentIndex = curIdx;

    const el = component.agenda.agendaElements[prevIdx];
    const secEl = component.agenda.agendaElements[curIdx];

    const expStarTime = el.startTime;

    // Act
    component.drop(drop);

    // Assert
    expect(secEl.startTime.hours).toBe(expStarTime.hours);
    expect(secEl.startTime.minutes).toBe(expStarTime.minutes);
  });
});
