import { Time } from '@angular/common';

export interface DayPlanInput {
  label: string;
  morningPages: boolean;
  training: boolean;
  running: boolean;
  atOffice: Time;
}
