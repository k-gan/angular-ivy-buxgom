import { Time } from "src/app/core/time";
import { WorkoutAgendaPoint } from "../points/workout-agenda-point.enum";

export class WorkoutAgendaElements {
  // TODO: this will need to be extended to provide overrides for start times
  // eg, workout always starts at 7 - but sometimes starts laters
  // and it would be good to be able to override it from the UI
  private readonly wrappedAgendaElements = new Map<WorkoutAgendaPoint, Time>();

  public get agendaElements() {
    return this.wrappedAgendaElements;
  }

  constructor() {
    this.wrappedAgendaElements.set(
      WorkoutAgendaPoint.PreGymBathroom,
      new Time(0, 20)
    );
    this.wrappedAgendaElements.set(
      WorkoutAgendaPoint.DriveToGymFromHome,
      new Time(0, 20)
    );
    this.wrappedAgendaElements.set(WorkoutAgendaPoint.WarmUp, new Time(0, 30));
    this.wrappedAgendaElements.set(WorkoutAgendaPoint.Workout, new Time(1, 30));
    this.wrappedAgendaElements.set(
      WorkoutAgendaPoint.PostWorkout,
      new Time(0, 20)
    );
    this.wrappedAgendaElements.set(
      WorkoutAgendaPoint.DriveToOfficeFromGym,
      new Time(0, 20)
    );
  }
}
