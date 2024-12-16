import { FilterData, useFilters } from "@/hooks/Filters/useFilters";
import { fa0, faClock, faFile, faWalkieTalkie } from "@fortawesome/free-solid-svg-icons";
import { FilterSectionType } from "./useFiltersSellsConfig";

export const useFiltersMeetingConfig = () => {
    const { filtersActive } = useFilters();

    const filtersMeeting : FilterSectionType[] = [
        { value: 'Cliente', label: 'Cliente', icon: faClock },
        { value: 'TipoContacto', label: 'Tipo de contacto', icon: faFile }
    ];

    const filterOfMeetings: FilterData[] = [
        {
            type: 'Cliente',
            data: [],
            value: filtersActive.find((item) => item.filter === 'Cliente')?.value ?? ''
        },
        {
            type: 'TipoContacto',
            data: [
                { filter: 'TipoContacto', value: "1", label: 'Cita' },
                { filter: 'TipoContacto', value: '2', label: 'Llamada' },
                { filter: 'TipoContacto', value: '3', label: 'Archivo Enviado' },
                { filter: 'TipoContacto', value: '4', label: 'Videollamada' },
            ],
            value: filtersActive.find((item) => item.filter === 'TipoContacto')?.value ?? ''
        }
    ];

    return { filtersMeeting, filterOfMeetings };
};
