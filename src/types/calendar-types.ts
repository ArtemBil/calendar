import { HolidayType } from "@/types/holiday-types";

export type CalendarType = {
  // Date string representation
  id: string;
  // should be a string as it can contain shortened month name
  day: string;
  isActive: boolean;
  isToday?: boolean;
  weekDay: string;
  holidays?: HolidayType[];
  tasks?: TaskType[];
};

export type LabelType = {
  id: string;
  name: string;
  // TODO: rework to hex?
  color: string;
};

export type TaskType = {
  taskId: string;
  taskContent: string;
  labels: LabelType[];
};

export type TasksType = {
  [key: string]: TaskType[];
};
