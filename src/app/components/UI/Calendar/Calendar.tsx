"use client";

import React from "react";
import { Box, Button, ButtonGroup } from "@mui/material";
import CalendarCell from "@/app/components/UI/CallendarCell/CallendarCell";
import SortByLabel from "@/app/components/UI/SortByLabel";
import SortByTask from "@/app/components/UI/SortByTask";
import { CalendarType } from "@/types/calendar-types";
import CalendarActions from "@/app/components/UI/CalendarActions";
import CalendarDataImporter from "@/app/components/UI/CalendarDataImporter/CalendarDataImporter";
import CalendarDataExporter from "@/app/components/UI/CalendarDataExporter";
import CalendarDataHtmlToImageSaver from "@/app/components/UI/CalendarDataHtmlToImageSaver";
import useCalendar from "@/app/components/UI/Calendar/useCalendar";
import WeekDays from "@/app/components/UI/WeekDays";
import {
  CalendarActionsContainer,
  CalendarCellsList,
  CalendarDateTitle,
} from "@/app/components/UI/Calendar/style";
import FiltersRow from "@/app/components/UI/FiltersRow";
import AvailableLabels from "@/app/components/UI/AvailableLabels";
import CreateLabel from "@/app/components/UI/CreateLabel";
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import Providers from "@/providers/Providers";

const Calendar = () => {
  const {
    loading,
    calendarCellsInitial,
    tasks,
    onPreviousMonthClick,
    onNextMonthClick,
    calendarRef,
    currentDateTitle,
    weekDays,
    calendarCells,
  } = useCalendar();

  return (
    <Providers calendarData={calendarCells}>
      {loading ? (
        <div>Loading the calendar...</div>
      ) : (
        <>
          <CalendarActionsContainer className="actions">
            <ButtonGroup>
              <Button onClick={onPreviousMonthClick}>
                <KeyboardArrowDownOutlined />
              </Button>
              <Button onClick={onNextMonthClick}>
                <KeyboardArrowUpOutlined />
              </Button>
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
    </Providers>
  );
};

export default Calendar;
