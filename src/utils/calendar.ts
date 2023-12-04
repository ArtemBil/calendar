import { HolidayType } from '@/types/holiday-types';
import { CalendarType, TaskType } from '@/types/calendar-types';

export const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const currentDate = new Date();
export const currentYear = currentDate.getFullYear();
export const currentMonth = currentDate.getMonth() + 1;
export const getPrevMonth = (currentDate: Date): Date => {
  const newDate = new Date();

  if (currentDate.getMonth() < 0) {
    newDate.setFullYear(currentDate.getFullYear() - 1);
    newDate.setMonth(11);
  } else {
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
): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): Date => {
  return new Date(year, month, 1);
};

//
// Calendar Cells generation
// _______________________________

export const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const getPreviousMonthDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() - 1);
};

const getNextMonthDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1);
};

const getCurrentDateData = (
  monthDay: number,
  date: Date,
  daysInMonth: number,
) => {
  const monthText = date.toLocaleString('default', { month: 'short' });
  const day = `${
    monthDay === 1 || monthDay === daysInMonth ? monthText : ''
  } ${monthDay}`;

  const dateByMonthDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    monthDay,
  );

  return {
    id: dateByMonthDay.toLocaleString('default', options),
    day: day,
    isActive: true,
    isToday:
      new Date().getDate() === monthDay &&
      new Date().getFullYear() === date.getFullYear() &&
      new Date().getMonth() === date.getMonth(),
  };
};

const getNextDateData = (
  nextMonthDay: number,
  date: Date,
  nextDateByYearAndMonth: Date,
  nextMonthDaysInMonth: number,
) => {
  const monthText = nextDateByYearAndMonth.toLocaleString('default', {
    month: 'short',
  });

  const day = `${
    nextMonthDay === 1 || nextMonthDay === nextMonthDaysInMonth ? monthText : ''
  } ${nextMonthDay}`;
  const dateByMonthDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    nextMonthDay,
  );

  return {
    id: dateByMonthDay.toLocaleString('default', options),
    day,
    isActive: false,
  };
};

const getPreviousDateData = (
  previousMonthDay: number,
  date: Date,
  prevDateByYearAndMonth: Date,
  prevMonthDaysInMonth: number,
) => {
  const monthText = prevDateByYearAndMonth.toLocaleString('default', {
    month: 'short',
  });

  const day = `${
    previousMonthDay === 1 || previousMonthDay === prevMonthDaysInMonth
      ? monthText
      : ''
  } ${previousMonthDay}`;

  const dateByMonthDay = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    previousMonthDay,
  );

  return {
    id: dateByMonthDay.toLocaleString('default', options),
    day,
    isActive: false,
  };
};

export const generateCalendarCells = (date: Date): CalendarType[] => {
  const numberOfRows = 6;
  const numberOfColumns = 7;
  const calendar: CalendarType[] = [];

  const prevDateByYearAndMonth = getPreviousMonthDate(date);
  const prevMonthDaysInMonth = getDaysInMonth(
    prevDateByYearAndMonth.getFullYear(),
    prevDateByYearAndMonth.getMonth(),
  );

  const nextDateByYearAndMonth = getNextMonthDate(date);
  const nextMonthDaysInMonth = getDaysInMonth(
    nextDateByYearAndMonth.getFullYear(),
    nextDateByYearAndMonth.getMonth(),
  );

  const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());

  const firstDayOfCurrentMonth = getFirstDayOfMonth(
    date.getFullYear(),
    date.getMonth(),
  ).getDay();

  for (let i = 0; i < numberOfColumns * numberOfRows; i++) {
    if (i >= firstDayOfCurrentMonth) {
      // fill in with current month days
      if (i - firstDayOfCurrentMonth < daysInMonth) {
        const monthDay = i - firstDayOfCurrentMonth + 1;

        calendar[i] = getCurrentDateData(monthDay, date, daysInMonth);
      } else {
        // fill in with the rest of the days of next month
        const nextMonthDay = i - daysInMonth - firstDayOfCurrentMonth + 1;

        calendar[i] = getNextDateData(
          nextMonthDay,
          date,
          nextDateByYearAndMonth,
          nextMonthDaysInMonth,
        );
      }
    } else {
      // fill in with the fields of previous month
      const previousMonthDay =
        prevMonthDaysInMonth - firstDayOfCurrentMonth + i + 1;

      calendar[i] = getPreviousDateData(
        previousMonthDay,
        date,
        prevDateByYearAndMonth,
        prevMonthDaysInMonth,
      );
    }
  }

  return calendar;
};

export async function loadWorldWideHoliday() {
  try {
    const response = await fetch(
      'https://date.nager.at/api/v3/NextPublicHolidaysWorldwide',
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
  if (!holidays?.length) {
    return calendar;
  }

  return calendar.map((date) => {
    const holidaysByDate = holidays.filter((holidayInfo) => {
      const holidayDate = new Date(holidayInfo.date).toLocaleString(
        'default',
        options,
      );

      return holidayDate === date.id;
    });

    return holidaysByDate.length ? { ...date, holidays: holidaysByDate } : date;
  });
}

export function appendTasks(calendar: CalendarType[], tasks: TaskType[]) {
  if (!tasks?.length) {
    return calendar;
  }

  return calendar.map((date) => {
    const filteredTasksByDate = tasks.filter((task) => {
      return task.calendarId === date.id;
    });

    return filteredTasksByDate.length
      ? { ...date, tasks: filteredTasksByDate }
      : date;
  });
}
