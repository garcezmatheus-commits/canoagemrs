export type CalendarTone = 'green' | 'red' | 'yellow' | 'navy';
export type CalendarEvent = {date: string; city: string; title: string; detail: string; tone: CalendarTone};
export type CalendarStatus = 'done' | 'next' | 'upcoming';
export type CalendarItem = CalendarEvent & {status: CalendarStatus; day: string; month: string; year: string};

export const calendar2026: CalendarEvent[] = [
  {date: '2026-04-25', city: 'Santa Tereza', title: 'Campeonato Gaúcho de Canoagem', detail: 'Maratona', tone: 'navy'},
  {date: '2026-10-17', city: 'Caxias do Sul', title: 'Campeonato Gaúcho de Canoagem', detail: 'Velocidade', tone: 'green'},
  {date: '2026-11-14', city: 'Estrela', title: 'Campeonato Gaúcho de Canoagem', detail: 'Velocidade', tone: 'red'},
  {date: '2026-12-12', city: 'Tapes', title: 'Canoagem Velocidade', detail: 'Provas de 200 metros', tone: 'yellow'},
];

const todayInRS = () => new Intl.DateTimeFormat('en-CA', {timeZone: 'America/Sao_Paulo'}).format(new Date());

// O evento só vira "realizado" no dia seguinte à data, no fuso do RS.
export function withStatus(events: CalendarEvent[], today = todayInRS()): CalendarItem[] {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  const nextDate = sorted.find(e => e.date >= today)?.date;
  return sorted.map(e => {
    const at = new Date(e.date + 'T12:00:00Z');
    return {
      ...e,
      status: e.date < today ? 'done' : e.date === nextDate ? 'next' : 'upcoming',
      day: e.date.slice(8, 10),
      month: new Intl.DateTimeFormat('pt-BR', {month: 'long', timeZone: 'UTC'}).format(at),
      year: e.date.slice(0, 4),
    };
  });
}
