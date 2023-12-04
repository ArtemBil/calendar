import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '@/hooks/store/hooks';
import { filterByTask } from '@/store/slices/filters-slice';
import { CalendarType } from '@/types/calendar-types';

export default function useSortByTask(calendar: CalendarType[]) {
  const [searchText, setSearchText] = useState('');
  const dispatch = useAppDispatch();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    if (!event) return;

    setSearchText(event.target.value);
    dispatch(filterByTask({ calendar, searchText: event.target.value }));
  };

  return {
    searchText,
    handleChange,
  };
}
