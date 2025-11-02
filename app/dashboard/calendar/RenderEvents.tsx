'use client';

import { EventContentArg } from '@fullcalendar/core/index.js';

export const renderEventContent = ({ eventInfo }: { eventInfo: EventContentArg }) : JSX.Element | null => {
  const eventType = eventInfo.event.extendedProps.TableType;
  const title = eventInfo.event.title;
  if (!title || title === 'null') return null;

  return (
    <div className="fc-event-modified">
      <span className={eventType === 'Bitacora' ? 'blue' : 'red'} />
      <p>{title}</p>
    </div>
  );
};
