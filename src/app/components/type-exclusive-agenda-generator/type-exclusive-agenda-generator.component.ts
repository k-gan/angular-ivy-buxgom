import { Component, OnInit } from '@angular/core';
import { AgendaGenerationService } from '../../services/agenda-generation.service';
import { AgendaSynchronizeService } from '../../services/agenda-synchronize.service';
import { AtOfficeTimesProviderService } from '../../services/at-office-times-provider.service';
import { AgendaModel } from '../agenda-generator/agenda-model';
import { AgendaType } from './agenda-type';

@Component({
  selector: 'app-type-exclusive-agenda-generator',
  templateUrl: './type-exclusive-agenda-generator.component.html',
  styleUrls: ['./type-exclusive-agenda-generator.component.css'],
})
export class TypeExclusiveAgendaGeneratorComponent {
  Object = Object;
  model: AgendaModel;
  readonly agendaTypes: AgendaType[];
  agendaType: AgendaType;

  constructor(
    private agendaService: AgendaGenerationService,
    private agendaSync: AgendaSynchronizeService,
    atOfficeTimeService: AtOfficeTimesProviderService
  ) {
    const atOfficeTimes = atOfficeTimeService.generateAtOfficeSelection();
    this.model = new AgendaModel(atOfficeTimes);

    const keys = Object.values(AgendaType).filter(k => typeof AgendaType[k as any] !== "number");
    this.agendaTypes = keys.map((k) => AgendaType[k]);
    this.agendaType = this.agendaTypes[0];
  }

  onSubmit() {
    const agenda = this.agendaService.generateAgenda(
      this.model.upToDateAgendaInput
    );
    this.agendaSync.changeAgenda(agenda);
  }
}
