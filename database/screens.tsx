import { getCurrentMonthRange } from '@/utils/getCurrentMonth';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faMoneyBill1,
  faSheetPlastic,
  faCalendar,
  faUserGroup,
  faGear,
  faHouse,
  faHandHoldingDollar,
  faComment
} from '@fortawesome/free-solid-svg-icons';

interface screenDataInterface {
  id: number;
  name: string;
  pathname: string;
  description: string;
  icon: IconProp;
};



const { DateStart, DateEnd } = getCurrentMonthRange();


export const screenData: screenDataInterface[] = [
  {
    id: 0,
    name: 'Iniciar sesión',
    pathname: '/dashboard/login',
    description: 'Clientes Olei CRM by olei software',
    icon: faUserGroup,
  },
  {
    id: 1,
    name: 'Inicio',
    pathname: '/dashboard/home',
    description: 'Olei CRM by olei software',
    icon: faHouse,
  },
  {
    id: 2,
    name: 'Clientes',
    pathname: '/dashboard/clients',
    description: 'Clientes Olei CRM by olei software',
    icon: faUserGroup,
  },
  {
    id: 3,
    name: 'Ventas',
    pathname: `/dashboard/sells/general?DateStart=${DateStart}&DateEnd=${DateEnd}`,
    description: 'Ventas Olei CRM by olei software',
    icon: faMoneyBill1,
  },
  {
    id: 4,
    name: 'C x C',
    pathname: '/dashboard/cobranza',
    description: 'Cobranza Olei CRM by olei software',
    icon: faHandHoldingDollar,
  },
  {
    id: 5,
    name: 'Abonos',
    pathname: '/dashboard/abonos',
    description: 'Abonos Olei CRM by olei software',
    icon: faHandHoldingDollar,
  },
  {
    id: 6,
    name: 'Bitacora',
    pathname: '/dashboard/bitacora',
    description: 'Bitacora Olei CRM by olei software',
    icon: faSheetPlastic,
  },
  {
    id: 7,
    name: 'Calendario',
    pathname: '/dashboard/calendar',
    description: 'Calendario Olei CRM by olei software',
    icon: faCalendar,
  },
  {
    id: 8,
    name: 'Agente',
    pathname: '/dashboard/agent',
    description: 'Agente Olei CRM by olei software',
    icon: faComment,
  },
  {
    id: 9,
    name: 'Configuracion',
    pathname: '/dashboard/settings',
    description: 'Configuración Olei CRM by olei software',
    icon: faGear,
  }
];
