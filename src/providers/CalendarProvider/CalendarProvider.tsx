import React, { createContext } from "react";
import { CalendarType } from "@/types/calendar-types";

export const CalendarContext = createContext<CalendarType[]>([]);

interface CalendarProviderProps {
  data: CalendarType[];
  children: React.ReactNode;
}

const CalendarProvider: React.FC<CalendarProviderProps> = ({
  data,
  children,
}) => {
  return (
    <CalendarContext.Provider value={data}>{children}</CalendarContext.Provider>
  );
};

export default CalendarProvider;
