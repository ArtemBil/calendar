import React from 'react';
import {
  WeekDaysList,
  WeekDaysListItem,
} from '@/app/components/UI/WeekDays/style';

interface WeekDaysProps {
  weekDays: string[];
}

const WeekDays: React.FC<WeekDaysProps> = ({ weekDays }) => {
  return (
    <WeekDaysList component="ul">
      {weekDays.map((weekDay) => {
        return (
          <WeekDaysListItem key={weekDay} weekDays={weekDays}>
            {weekDay}
          </WeekDaysListItem>
        );
      })}
    </WeekDaysList>
  );
};

export default WeekDays;
