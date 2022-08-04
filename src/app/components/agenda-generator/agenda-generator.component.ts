import { Component, OnInit } from '@angular/core';
import { AtOfficeTimesProviderService } from '../../services/at-office-times-provider.service';
import { AgendaGenerationService } from '../../services/agenda-generation.service';
import { AgendaSynchronizeService } from '../../services/agenda-synchronize.service';
import { AgendaModel } from './agenda-model';

@Component({
  selector: 'app-agenda-generator',
  templateUrl: './agenda-generator.component.html',
  styleUrls: ['./agenda-generator.component.css'],
})
export class AgendaGeneratorComponent implements OnInit {
  Object = Object;

  public model: AgendaModel;

  constructor(
    private agendaService: AgendaGenerationService,
    private agendaSync: AgendaSynchronizeService,
    atOfficeTimeService: AtOfficeTimesProviderService
  ) {
    const atOfficeTimes = atOfficeTimeService.generateAtOfficeSelection();
    this.model = new AgendaModel(atOfficeTimes);
  }

  ngOnInit() {}

  onSubmit() {
    const agenda = this.agendaService.generateAgenda(
      this.model.upToDateAgendaInput
    );
    this.agendaSync.changeAgenda(agenda);
  }
}
