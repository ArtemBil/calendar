import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarType, LabelType } from '@/types/calendar-types';

const initialState: CalendarType[] | [] = [];

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterByLabel: (
      state,
      action: PayloadAction<{
        calendar: CalendarType[];
        selectedLabels: LabelType[];
      }>,
    ) => {
      const { calendar, selectedLabels } = action.payload;

      if (!selectedLabels.length) {
        state = [];
        return state;
      }

      // always return new state array while filtering
      state = [];
      const calendarTasks = calendar.filter(
        (calendarCell) => !!calendarCell.tasks,
      );

      const filteredCalendar = calendarTasks.filter(({ tasks }) => {
        return (
          tasks &&
          tasks.some(({ labels }) => {
            return (
              labels &&
              labels.some((label) => {
                return selectedLabels.some((selectedLabel: LabelType) => {
                  return selectedLabel.id === label.id;
                });
              })
            );
          })
        );
      });

      if (filteredCalendar.length) {
        state = filteredCalendar;
      } else {
        state = [];
      }

      return state.filter((item) => !!item);
    },
    filterByTask: (
      state,
      action: PayloadAction<{
        calendar: CalendarType[];
        searchText: string;
      }>,
    ) => {
      const { calendar, searchText } = action.payload;

      if (!searchText.length) {
        state = [];
        return state;
      }

      // always return new state array while filtering
      state = [];

      const calendarTasks = calendar.filter(
        (calendarCell) => !!calendarCell.tasks,
      );

      if (calendarTasks.length) {
        const filteredCalendarTasks = calendarTasks.filter(({ tasks }) => {
          return (
            tasks &&
            tasks.some(({ content }) => {
              return content.toLowerCase().includes(searchText.toLowerCase());
            })
          );
        });

        if (filteredCalendarTasks.length) {
          state = filteredCalendarTasks;
        } else {
          state = [];
        }
      }

      // try to find something in holidays
      if (!state.length) {
        calendar.forEach(({ id, holidays }: CalendarType, index) => {
          if (!holidays) return false;

          const stringMatch = holidays.some((holiday) => {
            return holiday.name
              .toLowerCase()
              .includes(searchText.toLowerCase());
          });

          if (stringMatch) {
            const calendarIndex = calendar.findIndex(
              ({ id: dateIndex }: CalendarType) => id === dateIndex,
            );

            if (calendarIndex && calendar[calendarIndex]) {
              state[index] = calendar[calendarIndex];
            }
          }
        });
      }

      return state.filter((item) => !!item);
    },
  },
});

export const { filterByLabel, filterByTask } = filtersSlice.actions;

export default filtersSlice.reducer;
