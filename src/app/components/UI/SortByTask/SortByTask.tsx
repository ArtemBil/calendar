import React from "react";
import { TextField } from "@mui/material";
import useSortByTask from "@/app/components/UI/SortByTask/useSortByTask";
import { CalendarType } from "@/types/calendar-types";

interface SortByTaskProps {
  calendar: CalendarType[];
}
const SortByTask: React.FC<SortByTaskProps> = ({ calendar }) => {
  const { handleChange, searchText } = useSortByTask(calendar);

  return (
    <TextField
      placeholder="Search task by text"
      onChange={handleChange}
      value={searchText}
    />
  );
};

export default SortByTask;
