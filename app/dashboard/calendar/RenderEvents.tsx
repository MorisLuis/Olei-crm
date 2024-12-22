"use client";

import { EventContentArg } from "@fullcalendar/core/index.js";

interface RenderEventContentInterface {
    eventInfo: EventContentArg;
    processedDaysRef: React.MutableRefObject<{ [key: string]: boolean }>;
}

export const renderEventContent = ({
    eventInfo,
    processedDaysRef
}: RenderEventContentInterface) => {
    const eventDate = new Date(eventInfo.event.startStr).toISOString().split("T")[0];
    const eventCount = eventInfo.event.extendedProps.eventCount;
    const eventType = eventInfo.event.extendedProps.TableType;

    if (processedDaysRef.current[eventDate] && eventCount >= 3) {
        return null;
    }

    if (eventCount >= 3) {
        processedDaysRef.current[eventDate] = true;
        return (
            <div className="fc-event-modified many-events">
                <span className="white"></span>
                <p>{eventCount} Eventos hoy</p>
            </div>
        );
    }

    let additionalClass = "";
    if (eventCount === 1) additionalClass = "single-event";
    else if (eventCount > 1 && eventCount <= 3) additionalClass = "few-events";

    return (
        <div className={`fc-event-modified ${additionalClass}`}>
            <span className={eventType === "Bitacora" ? "blue" : "red"}></span>
            <p>{eventInfo.event.title === "null" ? "Sin titulo" : eventInfo.event.title}</p>
        </div>
    );
};
