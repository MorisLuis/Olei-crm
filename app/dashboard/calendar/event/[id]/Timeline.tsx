import { EventClickArg, EventInput } from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { usePathname } from 'next/navigation';
import React from 'react';
import TimelineSkeleton from '@/components/Skeletons/TimelineSkeleton';

interface TimelineComponentInterface {
    events: EventInput[] | null;
    onSelectEventFromTimeline: (Id_Bitacora: number) => void;
    isLoading: boolean
}

export default function Timeline({
    events,
    onSelectEventFromTimeline,
    isLoading,
}: TimelineComponentInterface): JSX.Element {
    const pathname = usePathname();
    const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
    const decodedDate = decodeURIComponent(lastSegment!);

    if (isLoading) {
        return <TimelineSkeleton />
    }

    if (!events) {
        return <></>
    }

    return (
        <section className="custom-timeline">
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridDay"
                initialDate={new Date(decodedDate)}
                events={events}
                height="auto"
                locale={esLocale}
                eventClick={(arg: EventClickArg): void => onSelectEventFromTimeline(arg.event.extendedProps?.Id_Bitacora as number)}
                headerToolbar={{
                    start: '',
                    center: 'title',
                    end: '',
                }}
                slotDuration="01:00:00"
                slotLabelInterval="01:00"
                slotMinTime="06:00:00"
                slotMaxTime="30:00:00"
                slotLabelFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                }}
                allDaySlot={false}
            />
        </section>
    )
}
