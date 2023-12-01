"use client";

import React from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import CalendarCell from "@/app/components/UI/CallendarCell/CallendarCell";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateLabelModal from "@/app/components/UI/CreateLabelModal";
import SortByLabel from "@/app/components/UI/SortByLabel";
import SortByTask from "@/app/components/UI/SortByTask";
import { CalendarType } from "@/types/calendar-types";
import CalendarActions from "@/app/components/UI/CalendarActions";
import CalendarDataImporter from "@/app/components/UI/CalendarDataImporter/CalendarDataImporter";
import CalendarDataExporter from "@/app/components/UI/CalendarDataExporter";
import CalendarDataHtmlToImageSaver from "@/app/components/UI/CalendarDataHtmlToImageSaver";
import useCalendar from "@/hooks/useCalendar";
import WeekDays from "@/app/components/UI/WeekDays";
import {
  CalendarActionsContainer,
  CalendarCellsList,
  CalendarDateTitle,
} from "@/app/components/UI/Calendar/style";
import FiltersRow from "@/app/components/UI/FiltersRow";
import AvailableLabels from "@/app/components/UI/AvailableLabels";
import CreateLabel from "@/app/components/UI/CreateLabel";

const Calendar = () => {
  const {
    open,
    loading,
    handleClose,
    calendarCellsInitial,
    tasks,
    handleOpen,
    onPreviousYearClick,
    onNextYearClick,
    onPreviousMonthClick,
    onNextMonthClick,
    calendarRef,
    currentDateTitle,
    weekDays,
    calendarCells,
  } = useCalendar();
  console.log(currentDateTitle);

  console.log("Calendar cells", calendarCells);
  return (
    <DndProvider backend={HTML5Backend}>
      {loading ? (
        <div>Loading the calendar...</div>
      ) : (
        <>
          <CalendarActionsContainer className="actions">
            <ButtonGroup>
              <Button onClick={onPreviousYearClick}>Previous year</Button>
              <Button onClick={onNextYearClick}>Next year</Button>
              <Button onClick={onPreviousMonthClick}>Previous month</Button>
              <Button onClick={onNextMonthClick}>Next month</Button>
            </ButtonGroup>
            <CalendarActions>
              <CreateLabel />
              <CalendarDataHtmlToImageSaver calendarRef={calendarRef} />
              <CalendarDataExporter tasks={tasks} />
              <CalendarDataImporter />
            </CalendarActions>
          </CalendarActionsContainer>
          <FiltersRow>
            <SortByLabel calendar={calendarCellsInitial} />
            <SortByTask calendar={calendarCellsInitial} />
          </FiltersRow>
          <AvailableLabels />
          <Box ref={calendarRef}>
            <CalendarDateTitle component="h2">
              {currentDateTitle}
            </CalendarDateTitle>
            <WeekDays weekDays={weekDays} />
            <CalendarCellsList component="ul">
              {calendarCells.map((calendarCell: CalendarType, index) => {
                return (
                  <CalendarCell
                    key={calendarCell.id}
                    {...calendarCell}
                    weekDays={weekDays}
                  />
                );
              })}
            </CalendarCellsList>
          </Box>
        </>
      )}
    </DndProvider>
  );
};

export default Calendar;
