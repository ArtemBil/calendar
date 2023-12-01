import { createSlice, current } from "@reduxjs/toolkit";
import { CalendarType } from "@/types/calendar-types";

export interface TasksInterface {
  [key: string]: [
    {
      taskId: string;
      taskContent: string;
      labels: string[];
    },
  ];
}

const initialState: TasksInterface | {} = [];

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterByLabel: (state: TasksInterface, action) => {
      const { calendar, tasks, selectedLabels } = action.payload;

      if (!selectedLabels.length) {
        state = [];
        return state;
      }

      // always return new state array while filtering
      state = [];

      Object.entries(tasks).forEach(([dateKey, tasks], index) => {
        const labelMatch = tasks.some((task) => {
          return task.labels.some((label) => {
            return selectedLabels.some(
              (selectedLabel) => selectedLabel.id === label.id,
            );
          });
        });

        console.log("TASKSSK", labelMatch);
        console.log(calendar);

        if (labelMatch) {
          // TODO: Check for empty fields ???
          const calendarIndex = calendar.findIndex(
            (calendarCell) => dateKey === calendarCell.id,
          );

          if (calendarIndex && calendar[calendarIndex]) {
            state[index] = calendar[calendarIndex];
          }
        }
      });

      return state;
    },
    filterByTask: (state: TasksInterface, action) => {
      const { calendar, tasks, searchText } = action.payload;

      if (!searchText.length) {
        state = [];
        return state;
      }

      // always return new state array while filtering
      state = [];

      Object.entries(tasks).forEach(([dateKey, tasks], index) => {
        // try to search in tasks
        const stringMatch = tasks.some((task) => {
          return task.taskContent
            .toLowerCase()
            .includes(searchText.toLowerCase());
        });

        console.log("TASKSSK stringMatch", stringMatch);
        // no tasks were found, try to find in calendar holidays
        if (stringMatch) {
          // const calendarIndex = calendar.findIndex(
          //   ([date, day]) => dateKey === date,
          // );
          const calendarIndex = calendar.findIndex(
            (calendarCell: CalendarType) => dateKey === calendarCell.id,
          );

          console.log("Trigger in stringMatch Match");
          if (calendarIndex && calendar[calendarIndex]) {
            state[index] = calendar[calendarIndex];
          }
        }
      });

      // try find something in holidays
      if (!state.length) {
        calendar.forEach(({ id, holidays }: CalendarType, index) => {
          if (!holidays) return false;

          const stringMatch = holidays.some((holiday) => {
            return holiday.name.toLowerCase().includes(searchText);
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

      return state;
    },
  },
});

export const { filterByLabel, filterByTask } = filtersSlice.actions;

export default filtersSlice.reducer;
