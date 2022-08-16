import { AgendaElement } from "./agenda-element";

// export class BaseAgenda {
//     constructor(private readonly agendaConfiguration)
//     private baseAgendaElements = new Map<AgendaPoint, Time>();
//     registerAgendaElements(agendaElements: Map<AgendaPoint, Time>) {
//     this.baseAgendaElements = new Map<AgendaPoint, Time>([
//       ...this.baseAgendaElements,
//       ...agendaElements,
//     ]);
//   }
//   protected registerAgendaElements(): void {
//     this.agendaElementCollater.registerAgendaElements(
//       new DefaultAgendaElements().agendaElements
//     );
//     this.agendaElementCollater.registerAgendaElements(
//       new HomeAgendaElements().agendaElements
//     );
//   }
// }