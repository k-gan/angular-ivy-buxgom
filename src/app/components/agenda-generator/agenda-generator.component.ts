import { Component } from "@angular/core";
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
    private agendaSync: AgendaSynchronizeService,
    private agendaNameService: AgendaNameService,
    selectTimesService: SelectTimesService
  ) {
    const atOfficeTimes = selectTimesService.generateAtOfficeSelection();
    const trainingTimes = selectTimesService.generateTrainingSelection();
    const tomekTimes = selectTimesService.generateTomeksSelection();

    this.model = new AgendaModel(
      atOfficeTimes,
      trainingTimes,
      tomekTimes,
      agendaNameService.getNext()
    );

    this.agendaTypes = this.getAllAgendaTypes();
  }

  private getAllAgendaTypes(): AgendaType[] {
    const keys = Object.values(AgendaType).filter(
      (k) => typeof AgendaType[k as any] !== "number"
    );
    return keys.map((k) => AgendaType[k]);
  }

  onSubmit() {
    const agenda = this.agendaService.generateAgenda(
      this.model.upToDateAgendaInput
    );
    this.agendaSync.changeAgenda(agenda);

    this.model.agendaInput.label = this.agendaNameService.getNext(
      this.model.agendaInput.label
    );
  }
}
