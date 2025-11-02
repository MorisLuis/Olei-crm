import { createContext, useContext, useCallback, useState } from "react";

type MeetingEvent = "created" | "updated";

interface MeetingEventsContextType {
  event: MeetingEvent | null;
  trigger: (e: MeetingEvent) => void;
  clear: () => void;
}

const MeetingEventsContext = createContext<MeetingEventsContextType | null>(null);

export const MeetingEventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [event, setEvent] = useState<MeetingEvent | null>(null);

  const trigger = useCallback((e: MeetingEvent) => setEvent(e), []);
  const clear = useCallback(() => setEvent(null), []);

  return (
    <MeetingEventsContext.Provider value={{ event, trigger, clear }}>
      {children}
    </MeetingEventsContext.Provider>
  );
};

export const useMeetingEvents = () => {
  const ctx = useContext(MeetingEventsContext);
  if (!ctx) throw new Error("useMeetingEvents must be used inside MeetingEventsProvider");
  return ctx;
};
