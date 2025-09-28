import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { EventClickArg } from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';
import MessageSecondaryCard from '@/components/Cards/MessageSecondaryCard'
import TimelineSkeleton from '@/components/Skeletons/TimelineSkeleton';
import { TimelineInterface, TimelineMeetingInterface } from '@/interface/calendar';
import { formatDateIsoOrNow } from '@/utils/format/formatDateIsoOrNow';
import styles from '../../../../../styles/pages/Calendar.module.scss';

interface TimelineComponentInterface {
    events: TimelineMeetingInterface[] | null;
    sellEvents: TimelineInterface[];
    navigateToModalSells: () => void;
    initialDateProp: string | Date;
    onSelectEventFromTimeline: (Id_Bitacora: number) => void;
    isLoading: boolean
    TotalVentas: number

}

export default function Timeline({
    events,
    sellEvents,
    navigateToModalSells,
    initialDateProp,
    onSelectEventFromTimeline,
    isLoading,
    TotalVentas
}: TimelineComponentInterface) : JSX.Element {

    if (isLoading) {
        return <TimelineSkeleton />
    }

    if (!events || !sellEvents) {
        return <></>
    }

    return (
        <>
            {/* DOCUMENTS */}
            <section className={styles.timelineContent__documents}>
                {sellEvents.length > 0 && (
                    <MessageSecondaryCard
                        title={`Hay ${TotalVentas} documentos expirados al dia de hoy.`}
                        icon={faFileExcel}
                        action={{
                            onClick: () => navigateToModalSells(),
                            color: 'blue',
                            text: 'Ver documentos',
                        }}
                    />
                )}
            </section>

            {/* TIMELINE */}
            <section className="custom-timeline">
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridDay"
                    initialDate={formatDateIsoOrNow(initialDateProp)} // Fecha inicial del calendario
                    slotDuration="01:00:00"
                    events={events} // Usar el arreglo mapeado
                    headerToolbar={{
                        start: '',
                        center: 'title',
                        end: '',
                    }}
                    eventClick={(arg: EventClickArg): void => onSelectEventFromTimeline(arg.event.extendedProps?.Id_Bitacora as number)}
                    allDaySlot={false}
                    locale={esLocale}
                    height={'auto'}
                />
            </section>
        </>
    )
}
