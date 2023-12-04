import React from 'react';
import { TextField } from '@mui/material';
import useSortByTask from '@/app/components/UI/SortByTask/useSortByTask';
import useCalendarProvider from '@/hooks/useCalendarProvider';

const SortByTask = () => {
  const calendar = useCalendarProvider();
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
