import { FilterData, useFilters } from "@/hooks/Filters/useFilters";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FilterSectionType } from "./useFiltersSellsConfig";
import MeetingInterface from "@/interface/meeting";

export type FilterTipoContacto = {
    filter: 'TipoContacto';
    value: MeetingInterface['TipoContacto'];
    label: string
};

export interface FilterDataMeeting extends Omit<FilterData, 'data'> {
    data: FilterTipoContacto[];
}

export const useFiltersMeetingConfig = () => {
    const { filtersActive } = useFilters();

    const filtersMeeting: FilterSectionType[] = [
        { value: 'TipoContacto', label: 'Tipo de contacto', icon: faFile }
    ];

    const filterOfMeetings: FilterDataMeeting[] = [
        {
            type: 'TipoContacto',
            data: [
                { filter: 'TipoContacto', value: 1, label: 'Cita' },
                { filter: 'TipoContacto', value: 2, label: 'Llamada' },
                { filter: 'TipoContacto', value: 3, label: 'Archivo Enviado' },
                { filter: 'TipoContacto', value: 4, label: 'Videollamada' },
            ],
            value: filtersActive.find((item) => item.filter === 'TipoContacto')?.value ?? ''
        }
    ];

    return { filtersMeeting, filterOfMeetings };
};
