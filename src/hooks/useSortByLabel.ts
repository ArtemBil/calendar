import { useAppDispatch, useAppSelector } from "@/hooks/store/hooks";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { filterByLabel } from "@/store/slices/filters-slice";
import { CalendarType } from "@/types/calendar-types";

export default function useSortByLabel(calendar: CalendarType[]) {
  const allLabels = useAppSelector((state) => state.labels);
  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const [taskLabels, setTaskLabels] = useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const labels = typeof value === "string" ? value.split(",") : value;
    setTaskLabels(labels);

    dispatch(filterByLabel({ calendar, selectedLabels: labels, tasks }));
  };

  return { taskLabels, handleChange, allLabels };
}
