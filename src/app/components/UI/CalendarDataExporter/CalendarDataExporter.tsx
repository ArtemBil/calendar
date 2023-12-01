import React from "react";
import { Button } from "@mui/material";
import { exportCalendarDataToJsonFile } from "@/utils/utils";

const CalendarDataExporter = ({ tasks }) => {
  const handleExportCalendarData = () => {
    exportCalendarDataToJsonFile(tasks);
  };

  return (
    <Button onClick={handleExportCalendarData}>Export calendar data</Button>
  );
};

export default CalendarDataExporter;
