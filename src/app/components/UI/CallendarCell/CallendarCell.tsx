import React from "react";
import { CalendarType } from "@/types/calendar-types";
import Holidays from "@/app/components/UI/Holidays";
import Tasks from "@/app/components/UI/Tasks/Tasks";
import useCalendarCell from "@/hooks/useCalendarCell";
import {
  ListItem,
  CalendarCellCardCounter,
  CalendarCellDay,
  CalendarCellHeaderBox,
} from "@/app/components/UI/CallendarCell/style";

const CalendarCell: React.FC<
  CalendarType & {
    weekDays: string[];
  }
> = ({ id, isActive, isToday, day, holidays, tasks, weekDays }) => {
  const { drop, taskModalOpen, handleTaskModalOpen, handleTaskModalClose } =
    useCalendarCell(id);
  const cardsCount =
    Array.isArray(tasks) && tasks.length
      ? `${tasks.length} ${tasks.length === 1 ? " card" : " cards"}`
      : null;

  return (
    <>
      <ListItem
        component="li"
        ref={drop}
        onClick={handleTaskModalOpen}
        isActive={isActive}
        weekDays={weekDays}
        isToday={isToday}
      >
        <CalendarCellHeaderBox>
          <CalendarCellDay isActive={isActive}>{day}</CalendarCellDay>
          <CalendarCellCardCounter>{cardsCount}</CalendarCellCardCounter>
        </CalendarCellHeaderBox>

        {holidays?.length ? <Holidays holidays={holidays} /> : null}
        <Tasks
          tasks={tasks}
          cellKey={id}
          open={taskModalOpen}
          handleClose={handleTaskModalClose}
        />
      </ListItem>
    </>
  );
};

export default CalendarCell;
