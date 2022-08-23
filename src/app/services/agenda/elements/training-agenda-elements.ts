import { Time } from "src/app/core/time";
import { TrainingAgendaPoint } from "../points/training-agenda-point.enum";

export class TrainingAgendaElements {
  // TODO: this will need to be extended to provide overrides for start times
  // eg, workout always starts at 7 - but sometimes starts laters
  // and it would be good to be able to override it from the UI
  private readonly wrappedAgendaElements = new Map<TrainingAgendaPoint, Time>();

  public get agendaElements() {
    return this.wrappedAgendaElements;
  }

  constructor() {
    this.wrappedAgendaElements.set(
      TrainingAgendaPoint.PreGymBathroom,
      new Time(0, 20)
    );
    this.wrappedAgendaElements.set(
      TrainingAgendaPoint.DriveToGymFromHome,
      new Time(0, 20)
    );
    this.wrappedAgendaElements.set(TrainingAgendaPoint.WarmUp, new Time(0, 30));
    this.wrappedAgendaElements.set(
      TrainingAgendaPoint.Workout,
      new Time(1, 30)
    );
    this.wrappedAgendaElements.set(
      TrainingAgendaPoint.PostWorkout,
      new Time(0, 20)
    );
    this.wrappedAgendaElements.set(
      TrainingAgendaPoint.DriveToOfficeFromGym,
      new Time(0, 20)
    );
  }
}
