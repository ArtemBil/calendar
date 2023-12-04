import { useContext } from "react";
import { CalendarContext } from "@/providers/CalendarProvider/CalendarProvider";

export default function useCalendarProvider() {
  const data = useContext(CalendarContext);

  if (!data) {
    throw new Error("You must use this hook inside of CalendarProvider");
  }

  return data;
}
