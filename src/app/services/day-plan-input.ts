import { Time } from '@angular/common';

export class DayPlanInput {
  label: string;
  morningPages: boolean;
  training: boolean;
  tomeks: boolean;
  running: boolean;
  atOffice: Time;
}
