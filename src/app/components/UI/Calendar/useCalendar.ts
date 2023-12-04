import { useEffect, useRef, useState } from "react";
import {
  appendTasks,
  appendWorldWideHolidays,
  currentDate,
  generateCalendarCells,
  getNextMonth,
  getPrevMonth,
  loadWorldWideHoliday,
  week,
} from "@/utils/calendar";
import { RootState } from "@/store/store";
import { HolidayType } from "@/types/holiday-types";
import { CalendarType } from "@/types/calendar-types";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "@/hooks/store/hooks";
import { loadTasks } from "@/store/slices/tasks-slice";
import { loadLabels } from "@/store/slices/labels-slice";

export default function useCalendar() {
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [currentSelectedDate, setCurrentSelectedYear] =
    useState<Date>(currentDate);
  const tasks = useAppSelector((state) => state.tasks);
  const filteredTasks = useAppSelector(
    (state: RootState) => state.filteredTasks,
  );
  const [calendarCellsInitial, setCalendarCellsInitial] = useState<
    CalendarType[] | []
  >([]);
  const [loading, setIsLoading] = useState(true);
  const [calendarCells, setCalendarCells] = useState<CalendarType[] | []>([]);
  const [weekDays, setWeekDays] = useState(week);
  const [holidays, setHolidays] = useState<HolidayType[] | []>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadTasks());
    dispatch(loadLabels());
  }, []);

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
    setCalendarCells(calendarCellsInitial);
  }, [calendarCellsInitial]);

  useEffect(() => {
    filteredTasks.length
      ? setCalendarCells(filteredTasks)
      : setCalendarCells(calendarCellsInitial);
  }, [filteredTasks]);

  useEffect(() => {
    if (calendarCells.length) {
      const newWeeks = week.filter((weekDay, index, array) => {
        return calendarCells.find((calendar: CalendarType) => {
          return calendar && array[new Date(calendar.id).getDay()] === weekDay;
        });
      });

      if (!_.isEqual(newWeeks, weekDays)) {
        setWeekDays(newWeeks);
      }
    }
  }, [calendarCells]);

  return {
    loading,
    calendarCellsInitial,
    tasks,
    onPreviousMonthClick,
    onNextMonthClick,
    calendarRef,
    currentDateTitle,
    weekDays,
    calendarCells,
  };
}
