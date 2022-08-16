import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateTimeModifiers } from '../core/DateTimeModifiers';
import { Agenda } from './agenda/agenda';
import { AgendaElementCollaterService } from './agenda/agenda-element-collater.service';
import { AgendaFactoryService } from './agenda/agenda-factory.service';
import { AgendaType } from './agenda/agenda-type';
import { DefaultAgendaElements } from './agenda/default-agenda-elements';
import { DefaultAgendaPoint } from './agenda/default-agenda-point';
import { HomeAgendaElements } from './agenda/home-agenda-elements';
import { HomeAgendaPoint } from './agenda/home-agenda-point';
import { TrainingAgendaPoint } from './agenda/training-agenda-point.enum';
import { DayPlanInput } from './day-plan-input';

@Injectable({ providedIn: 'root' })
export class AgendaGenerationService {
  constructor(
    private readonly agendaFactoryService: AgendaFactoryService,
    private readonly agendaCollaterService: AgendaElementCollaterService
  ) {
    agendaCollaterService.registerAgendaElements(
      new DefaultAgendaElements().agendaElements
    );
    agendaCollaterService.registerAgendaElements(
      new HomeAgendaElements().agendaElements
    );
  }

  generateAgenda(input: DayPlanInput): Agenda {
    if (input.agendaType === AgendaType.Training) {
      return this.generateTrainingAgenda(input);
    }

    const agenda: Agenda = this.agendaFactoryService.createDefaultAgenda(
      input.label
    );

    if (input.running) {
      const runningEl = this.agendaCollaterService.createAgendaElement(
        HomeAgendaPoint.Running
      );
      agenda.addElementAfter(DefaultAgendaPoint.WakeUp, runningEl);
    }
    if (input.morningPages) {
      const morningPagesEl = this.agendaCollaterService.createAgendaElement(
        DefaultAgendaPoint.MorningPages
      );
      agenda.addElementAfter(DefaultAgendaPoint.WakeUp, morningPagesEl);
    }
    if (input.agendaType === AgendaType.Tomek) {
      const elements = [
        this.agendaCollaterService.createAgendaElement(
          HomeAgendaPoint.DriveToOfficeFromTomeks
        ),
        this.agendaCollaterService.createAgendaElement(
          HomeAgendaPoint.AtTomeks
        ),
        this.agendaCollaterService.createAgendaElement(
          HomeAgendaPoint.DriveToTomeksFromHome
        ),
      ];
      for (let el of elements) {
        agenda.addElementAfter(DefaultAgendaPoint.BathroomTime, el);
      }
      agenda.removeElement(HomeAgendaPoint.DriveToOfficeFromHome);
    }

    return this.finalizeAgenda(agenda, input.atOffice);
  }

  generateTrainingAgenda(input: DayPlanInput): Agenda {
    const agenda: Agenda = this.agendaFactoryService.createTrainingAgenda(
      input.label
    );

    if (input.running) {
      console.log('Running is not possible when in training mode.');
    }
    if (input.morningPages) {
      const morningPagesEl = this.agendaCollaterService.createAgendaElement(
        DefaultAgendaPoint.MorningPages
      );
      agenda.addElementAfter(DefaultAgendaPoint.AtWork, morningPagesEl);
    }

    return this.finalizeAgenda(agenda, input.atOffice);
  }

  private finalizeAgenda(agenda: Agenda, atOffice: Time): Agenda {
    let startTime = atOffice;
    for (let agendaElement of [...agenda.agendaElements].reverse()) {
      startTime = DateTimeModifiers.decreaseTime(
        startTime,
        agendaElement.duration
      );
      if (agendaElement.agenda == TrainingAgendaPoint.Workout) {
        const trainingTime: Time = { hours: 7, minutes: 0 };
        if (
          startTime.hours * 60 + startTime.minutes <
          trainingTime.hours * 60 + trainingTime.minutes
        ) {
          startTime = trainingTime;
        }
      }
      agendaElement.startTime = startTime;
    }

    return agenda;
  }
}
