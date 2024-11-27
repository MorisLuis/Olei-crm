import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChartSimple, faMoneyBill1, faSheetPlastic, faCalendar, faUserGroup, faGear } from '@fortawesome/free-solid-svg-icons';

interface screenDataInterface {
    id: number;
    name: string;
    pathname: string;
    description: string;
    icon: IconProp
}

export const screenData : screenDataInterface[] = [
    {
        id: 0,
        name: "Inicio",
        pathname: "/",
        description: "Olei CRM by olei software",
        icon: faChartSimple
    },
    {
        id: 1,
        name: "Ventas",
        pathname: "/sells",
        description: "Ventas Olei CRM by olei software",
        icon: faMoneyBill1
    },
    {
        id: 2,
        name: "Bitacora",
        pathname: "/bitacora",
        description: "Bitacora Olei CRM by olei software",
        icon: faSheetPlastic
    },
    {
        id: 3,
        name: "Calendario",
        pathname: "/calendar",
        description: "Calendario Olei CRM by olei software",
        icon: faCalendar
    },
    {
        id: 4,
        name: "Clientes",
        pathname: "/clients",
        description: "Clientes Olei CRM by olei software",
        icon: faUserGroup
    },
    {
        id: 5,
        name: "Configuracion",
        pathname: "/settings",
        description: "Configuración Olei CRM by olei software",
        icon: faGear
    },
    {
        id: 6,
        name: "Cobranza",
        pathname: "/cobranza",
        description: "Cobranza Olei CRM by olei software",
        icon: faGear
    }
]