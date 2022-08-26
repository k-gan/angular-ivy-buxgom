import { Component } from "@angular/core";
import { Time } from "src/app/core/time";
import { AgendaFinalizer } from "src/app/services/agenda-finalizer.service";
import { AgendaNameService } from "src/app/services/agenda-name.service";
import { AgendaGenerationService } from "../../services/agenda-generation.service";
import { AgendaSynchronizeService } from "../../services/agenda-synchronize.service";
import { AgendaType } from "../../services/agenda/agenda-type";
import { SelectTimesService } from "../../services/select-times.service";
import { AgendaModel } from "./agenda-model";

@Component({
  selector: "app-agenda-generator",
  templateUrl: "./agenda-generator.component.html",
  styleUrls: ["./agenda-generator.component.css"],
})
export class AgendaGeneratorComponent {
  Object = Object;
  model: AgendaModel;
  readonly agendaTypes: AgendaType[];

  constructor(
    private agendaService: AgendaGenerationService,
    private agendaFinalizer: AgendaFinalizer,
    private agendaSync: AgendaSynchronizeService,
    private agendaNameService: AgendaNameService,
    selectTimesService: SelectTimesService
  ) {
    this.initModel(selectTimesService, agendaNameService);
    this.agendaTypes = this.getAllAgendaTypes();
  }

  onSubmit() {
    const inputAgenda = this.agendaService.createEnrichedAgenda(
      this.model.agendaInput
    );
    const finalAgenda = this.agendaFinalizer.finalizeAgenda(
      inputAgenda,
      this.model.agendaInput.atOffice,
      this.model.agendaInput.startTimeOverrides
    );
    this.agendaSync.changeAgenda(finalAgenda);

    this.model.agendaInput.label = this.agendaNameService.getNext(
      this.model.agendaInput.label
    );
  }

  private initModel(
    selectTimesService: SelectTimesService,
    agendaNameService: AgendaNameService
  ) {
    const atOfficeTimes = selectTimesService.generateAtOfficeSelection();
    const workoutTimes = selectTimesService.generateWorkoutSelection();
    const tomekTimes = selectTimesService.generateAtTomeksSelection();

    this.model = new AgendaModel(
      atOfficeTimes,
      workoutTimes,
      tomekTimes,
      agendaNameService.getNext()
    );

    this.initWorkoutTime(
      selectTimesService.dayPlanSettings.workout.defaultTime
    );
  }

  private initWorkoutTime(defaultTime: Time) {
    const workoutIdx = this.model.workoutTimes.findIndex((t) =>
      t.isEqual(defaultTime)
    );

    if (workoutIdx > -1) {
      this.model.workoutTimeId = workoutIdx;
    }
  }

  private getAllAgendaTypes(): AgendaType[] {
    const keys = Object.values(AgendaType).filter(
      (k) => typeof AgendaType[k as any] !== "number"
    );
    return keys.map((k) => AgendaType[k]);
  }
}
