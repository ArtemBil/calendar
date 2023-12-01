import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store/hooks";
import { filterByTask } from "@/store/slices/filters-slice";
import { CalendarType } from "@/types/calendar-types";

export default function useSortByTask(calendar: CalendarType[]) {
  const [searchText, setSearchText] = useState("");
  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    if (!event) return;

    setSearchText(event.target.value);

    console.log(event.target.value);

    dispatch(filterByTask({ calendar, searchText: event.target.value, tasks }));
  };

  return {
    searchText,
    handleChange,
  };
}
