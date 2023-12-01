import { HolidayType } from "@/types/holiday-types";
import { CalendarType, TasksType } from "@/types/calendar-types";
import _ from "lodash";

export const week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const currentDate = new Date();

export const currentYear = currentDate.getFullYear();
export const currentMonth = currentDate.getMonth() + 1;
const newDate = new Date();
// console.log("Full year -> ", newDate.getFullYear());
// console.log("Month -> ", newDate.getMonth());
// console.log("Day -> ", newDate.getDay());
// console.log("Days in month -> ", newDate.getMonth());
// nums of days in month in specific
// const numDays = (y, m) => new Date(y, m, 0).getDate();

// export const getDateData = () =>

export const getPrevYear = (currentDate: Date): Date => {
  const newDate = new Date();
  newDate.setFullYear(currentDate.getFullYear() - 1);
  return newDate;
};

export const getNextYear = (currentDate: Date): Date => {
  const newDate = new Date();
  newDate.setFullYear(currentDate.getFullYear() + 1);
  return newDate;
};

export const getPrevMonth = (currentDate: Date): Date => {
  const newDate = new Date();

  if (currentDate.getMonth() < 0) {
    newDate.setFullYear(currentDate.getFullYear() - 1);
    newDate.setMonth(11);
  } else {
    console.log("Trigger");
    newDate.setFullYear(currentDate.getFullYear());
    newDate.setMonth(currentDate.getMonth() - 1);
  }

  return newDate;
};

export const getNextMonth = (currentDate: Date): Date => {
  let newDate = new Date();

  if (currentDate.getMonth() == 11) {
    newDate.setFullYear(currentDate.getFullYear() + 1);
    newDate.setMonth(0);
  } else {
    newDate.setFullYear(currentDate.getFullYear());
    newDate.setMonth(currentDate.getMonth() + 1);
  }

  return newDate;
};

export const getDaysInMonth = (
  year: number = currentYear,
  month: number = currentMonth,
  debug = "",
): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDayString = (date: Date) => {
  return week[date.getDay()];
};

const getFirstDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month, 1);
};

const getLastDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month + 1, 0);
};

export const generateCalendarCells = (date: Date): CalendarType[] => {
  const numberOfRows = 6;
  const numberOfColumns = 7;
  let arr: CalendarType[] = [];

  const prevDateByYearAndMonth = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
  );

  const nextDateByYearAndMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
  );

  const prevMonthDaysInMonth = getDaysInMonth(
    prevDateByYearAndMonth.getFullYear(),
    prevDateByYearAndMonth.getMonth(),
    "test",
  );

  const daysInMonth = getDaysInMonth(
    date.getFullYear(),
    date.getMonth(),
    "test",
  );

  const nextMonthDaysInMonth = getDaysInMonth(
    nextDateByYearAndMonth.getFullYear(),
    nextDateByYearAndMonth.getMonth(),
  );

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // [1, 2, 3, 4, 5, 6, 7]
  // [1, 2, 3, 4, 5, 6, 7]
  // [1, 2, 3, 4, 5, 6, 7]
  // [1, 2, 3, 4, 5, 6, 7]
  // [1, 2, 3, 4, 5, 6, 7]
  // [1, 2, 3, 4, 5, 6, 7]

  for (let i = 0; i < numberOfColumns * numberOfRows; i++) {
    // get the day index of current month
    const firstDayOfCurrentMonth = getFirstDayOfMonth(
      date.getFullYear(),
      date.getMonth(),
    ).getDay();
    // console.log("firstDayOfCurrentMonth", firstDayOfCurrentMonth);

    // if this is true then we should fill in the current month days or the rest of the next month days
    if (i + 1 > firstDayOfCurrentMonth) {
      // if this is true then fill in with current month days
      if (i - firstDayOfCurrentMonth < daysInMonth) {
        const monthDay = i - firstDayOfCurrentMonth + 1;
        const monthText = date.toLocaleString("default", { month: "short" });
        const day = `${
          monthDay === 1 || monthDay === daysInMonth ? monthText : ""
        } ${monthDay}`;
        const dateByMonthDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          monthDay,
        );
        const weekDay = week[dateByMonthDay.getDay()];

        arr[i] = {
          id: dateByMonthDay.toLocaleString("default", options),
          day: day,
          isActive: true,
          isToday:
            new Date().getDate() === monthDay &&
            new Date().getFullYear() === date.getFullYear() &&
            new Date().getMonth() === date.getMonth(),
          weekDay,
        };
      } else {
        // fill in the array with the rest of days of next month
        console.log("Index", i);
        console.log("firstDayOfCurrentMonth", firstDayOfCurrentMonth);
        console.log("nextMonthDaysInMonth", nextMonthDaysInMonth);
        // TODO: Check
        const nextMonthDay = i - daysInMonth - firstDayOfCurrentMonth + 1;
        // i - firstDayOfCurrentMonth + 1 - nextMonthDaysInMonth + 1;
        //TODO :nextMonthDaysInMonth + 1 ??
        const monthText = nextDateByYearAndMonth.toLocaleString("default", {
          month: "short",
        });
        // console.log(nextMonthDay);

        const day = `${
          nextMonthDay === 1 || nextMonthDay === nextMonthDaysInMonth
            ? monthText
            : ""
        } ${nextMonthDay}`;
        const dateByMonthDay = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          nextMonthDay,
        );
        const weekDay = week[dateByMonthDay.getDay()];

        arr[i] = {
          id: dateByMonthDay.toLocaleString("default", options),
          day,
          isActive: false,
          weekDay,
        };
      }
    } else {
      // fill in the array with the fields of previous month
      const previousMonthDay =
        prevMonthDaysInMonth - firstDayOfCurrentMonth + i + 1;
      const monthText = prevDateByYearAndMonth.toLocaleString("default", {
        month: "short",
      });

      const day = `${
        previousMonthDay === 1 || previousMonthDay === prevMonthDaysInMonth
          ? monthText
          : ""
      } ${previousMonthDay}`;

      const dateByMonthDay = new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        previousMonthDay,
      );
      const weekDay = week[dateByMonthDay.getDay()];

      arr[i] = {
        id: dateByMonthDay.toLocaleString("default", options),
        day,
        isActive: false,
        weekDay,
      };
    }
  }

  // console.log("Result Calendar", arr);
  return arr;
};

export async function loadWorldWideHoliday() {
  try {
    const response = await fetch(
      "https://date.nager.at/api/v3/NextPublicHolidaysWorldwide",
    );

    return (await response.json()) as HolidayType[];
  } catch (e) {
    return [];
  }
}

export function appendWorldWideHolidays(
  holidays: HolidayType[],
  calendar: CalendarType[],
) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return calendar.map((date) => {
    const holidaysByDate = holidays.filter((holidayInfo) => {
      const holidayDate = new Date(holidayInfo.date).toLocaleString(
        "default",
        options,
      );

      return holidayDate === date.id;
    });

    return holidaysByDate.length ? { ...date, holidays: holidaysByDate } : date;
  });
}

export function appendTasks(calendar: CalendarType[], tasks: TasksType) {
  return calendar.map((date) => {
    return tasks[date.id] ? { ...date, tasks: tasks[date.id] } : date;
  });
}
