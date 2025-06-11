import { TimelineInterface } from '@/interface/calendar';

export const calendarTimelineExamples: TimelineInterface[] = [
  {
    Descripcion: 'Reunion madrugada',
    Fecha: new Date(2024, 11, 22),
    TableType: 'Bitacora',
    Id_Bitacora: 1,
    Hour: '01:30',
    HourEnd: '02:20',
  },
  {
    Descripcion: 'Reunion para temas muy importantes',
    Fecha: new Date(2024, 11, 22),
    TableType: 'Bitacora',
    Id_Bitacora: 2,
    Hour: '12:30',
    HourEnd: '13:20',
  },
  {
    Descripcion: 'Reunion para temas muy importantes',
    Fecha: new Date(2024, 11, 22),
    TableType: 'Bitacora',
    Id_Bitacora: 3,
    Hour: '12:30',
    HourEnd: '14:20',
  },
  {
    Descripcion: 'Remisión',
    Folio: 21,
    Fecha: new Date(2024, 11, 22),
    TableType: 'Ventas',
    Id_Sell: '1-1--0',
  },
  {
    Descripcion: 'Cotización',
    Folio: 212,
    Fecha: new Date(2024, 11, 22),
    TableType: 'Ventas',
    Id_Sell: '2-1--0',
  },
];
