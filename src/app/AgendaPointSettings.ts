import { Time } from "./core/time";

export class AgendaPointSettings {
  constructor(
    public readonly earliest: Time,
    public readonly latest: Time,
    public readonly defaultTime?: Time
  ) {}
}
