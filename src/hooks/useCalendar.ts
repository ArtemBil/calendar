import { useEffect, useRef, useState } from "react";
import {
  appendTasks,
  appendWorldWideHolidays,
  currentDate,
  generateCalendarCells,
  getNextMonth,
  getNextYear,
  getPrevMonth,
  getPrevYear,
  loadWorldWideHoliday,
  week,
} from "@/utils/calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { HolidayType } from "@/types/holiday-types";
import { CalendarType } from "@/types/calendar-types";
import _ from "lodash";

export default function useCalendar() {
  const calendarRef = useRef();
  const [currentSelectedDate, setCurrentSelectedYear] =
    useState<Date>(currentDate);
  const tasks = useSelector((state: RootState) => state.tasks);
  const filteredTasks = useSelector((state: RootState) => state.filteredTasks);
  const [calendarCellsInitial, setCalendarCellsInitial] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [calendarCells, setCalendarCells] = useState([]);
  const [open, setOpen] = useState(false);
  const [weekDays, setWeekDays] = useState(week);
  const [holidays, setHolidays] = useState<HolidayType[] | []>([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    (async () => {
      const holidays = await loadWorldWideHoliday();
      setHolidays(holidays);
    })();
  }, []);

  useEffect(() => {
    console.log(currentSelectedDate);
  }, [currentSelectedDate]);

  const currentDateTitle =
    currentSelectedDate.toLocaleString("default", { month: "long" }) +
    " " +
    currentSelectedDate.getFullYear();

  const onPreviousYearClick = () => {
    const previousYearDate = getPrevYear(currentSelectedDate);
    setCurrentSelectedYear(previousYearDate);
  };

  const onNextYearClick = () => {
    const nextYearDate = getNextYear(currentSelectedDate);

    setCurrentSelectedYear(nextYearDate);
  };

  const onPreviousMonthClick = () => {
    const previousMonthDate = getPrevMonth(currentSelectedDate);

    setCurrentSelectedYear(previousMonthDate);
  };

  const onNextMonthClick = () => {
    const nextMonthDate = getNextMonth(currentSelectedDate);
    console.log(nextMonthDate);
    setCurrentSelectedYear(nextMonthDate);
  };

  useEffect(() => {
    const calendar = appendTasks(
      appendWorldWideHolidays(
        holidays,
        generateCalendarCells(currentSelectedDate),
      ),
      tasks,
    );

    setCalendarCellsInitial(calendar);
    setIsLoading(false);
  }, [currentSelectedDate, tasks, holidays]);

  useEffect(() => {
    console.log("Trigger");
    setCalendarCells(calendarCellsInitial);
  }, [calendarCellsInitial]);

  useEffect(() => {
    filteredTasks.length
      ? setCalendarCells(filteredTasks)
      : setCalendarCells(calendarCellsInitial);
  }, [filteredTasks]);

  useEffect(() => {
    if (calendarCells.length) {
      const newWeeks = week.filter((weekDay) => {
        return calendarCells.find((calendar: CalendarType) => {
          return calendar && calendar.weekDay === weekDay;
        });
      });

      if (!_.isEqual(newWeeks, weekDays)) {
        setWeekDays(newWeeks);
      }
    }
  }, [calendarCells]);

  return {
    open,
    handleClose,
    loading,
    calendarCellsInitial,
    tasks,
    onPreviousMonthClick,
    onNextMonthClick,
    handleOpen,
    onPreviousYearClick,
    onNextYearClick,
    calendarRef,
    currentDateTitle,
    weekDays,
    calendarCells,
  };
}
