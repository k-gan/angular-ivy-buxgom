import { Time } from '@angular/common';
import { TrainingAgendaPoint } from '../points/training-agenda-point.enum';

export class TrainingAgendaElements {
  // TODO: this will need to be extended to provide overrides for start times
  // eg, workout always starts at 7 - but sometimes starts laters
  // and it would be good to be able to override it from the UI
  private readonly wrappedAgendaElements = new Map<TrainingAgendaPoint, Time>();

  public get agendaElements() {
    return this.wrappedAgendaElements;
  }

  constructor() {
    this.wrappedAgendaElements.set(TrainingAgendaPoint.PreGymBathroom, {
      hours: 0,
      minutes: 20,
    });
    this.wrappedAgendaElements.set(TrainingAgendaPoint.DriveToGymFromHome, {
      hours: 0,
      minutes: 20,
    });
    this.wrappedAgendaElements.set(TrainingAgendaPoint.WarmUp, {
      hours: 0,
      minutes: 30,
    });
    this.wrappedAgendaElements.set(TrainingAgendaPoint.Workout, {
      hours: 1,
      minutes: 30,
    });
    this.wrappedAgendaElements.set(TrainingAgendaPoint.PostWorkout, {
      hours: 0,
      minutes: 20,
    });
    this.wrappedAgendaElements.set(TrainingAgendaPoint.DriveToOfficeFromGym, {
      hours: 0,
      minutes: 20,
    });
  }
}
