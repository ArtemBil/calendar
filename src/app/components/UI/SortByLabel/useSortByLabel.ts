import { useAppDispatch, useAppSelector } from '@/hooks/store/hooks';
import { SyntheticEvent, useState } from 'react';
import { filterByLabel } from '@/store/slices/filters-slice';
import { CalendarType, LabelType } from '@/types/calendar-types';

export default function useSortByLabel(calendar: CalendarType[]) {
  const allLabels = useAppSelector((state) => state.labels);
  const dispatch = useAppDispatch();
  const [taskLabels, setTaskLabels] = useState<LabelType[] | []>([]);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    selectedLabels: LabelType[],
  ) => {
    setTaskLabels(selectedLabels);

    dispatch(filterByLabel({ calendar, selectedLabels }));
  };

  return { taskLabels, handleChange, allLabels };
}
