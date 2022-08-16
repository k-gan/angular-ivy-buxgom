import { Time } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateTimeModifiers } from '../core/DateTimeModifiers';
import { Agenda } from './agenda/agenda';
import { AgendaElementCollaterService } from './agenda/agenda-element-collater.service';
import { AgendaFactoryService } from './agenda/agenda-factory.service';
import { AgendaPoint } from './agenda/agenda-point';
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
    const agenda : Agenda = this.generateSpecificAgenda(input);
    return this.finalizeAgenda(agenda, input.atOffice);
  }

  private generateSpecificAgenda(input : DayPlanInput) : Agenda {
    if (input.agendaType === AgendaType.Training) {
      return this.generateTrainingAgenda(input);
    } 
    
    const agenda = this.generateDefaultAgenda(input);
    if (input.agendaType === AgendaType.Tomek) {
      return this.enrichWithTomek(agenda);
    }

    return agenda;
  }

  private generateDefaultAgenda(input : DayPlanInput) : Agenda {
    const agenda: Agenda = this.agendaFactoryService.createDefaultAgenda(
      input.label
    );

    if (input.running) {
      this.addToAgendaAfter(agenda, HomeAgendaPoint.Running, DefaultAgendaPoint.WakeUp);
    }
    if (input.morningPages) {
      this.addToAgendaAfter(agenda, DefaultAgendaPoint.MorningPages, DefaultAgendaPoint.WakeUp);
    }

    return agenda;
  }

  private enrichWithTomek(agenda: Agenda) : Agenda {
    const elements = [
        HomeAgendaPoint.DriveToOfficeFromTomeks,
        HomeAgendaPoint.AtTomeks,
        HomeAgendaPoint.DriveToTomeksFromHome
      ,
    ];
    for (let point of elements) {
      this.addToAgendaAfter(agenda, point, DefaultAgendaPoint.BathroomTime);
    }

    agenda.removeElement(HomeAgendaPoint.DriveToOfficeFromHome);

    return agenda;
  }

  private generateTrainingAgenda(input: DayPlanInput): Agenda {
    const agenda: Agenda = this.agendaFactoryService.createTrainingAgenda(
      input.label
    );

    if (input.running) {
      console.log('Running is not possible when in training mode.');
    }
    if (input.morningPages) {
      this.addToAgendaAfter(agenda, DefaultAgendaPoint.AtWork, DefaultAgendaPoint.WakeUp);
    }

    return this.finalizeAgenda(agenda, input.atOffice);
  }

  private addToAgendaAfter(agenda : Agenda, addPoint : AgendaPoint, afterPoint : AgendaPoint) : void {
    const el = this.agendaCollaterService.createAgendaElement(addPoint);
    agenda.addElementAfter(afterPoint, el);
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
