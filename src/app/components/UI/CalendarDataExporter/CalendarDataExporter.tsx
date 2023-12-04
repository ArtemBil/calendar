import React from "react";
import { Button } from "@mui/material";
import { exportCalendarDataToJsonFile } from "@/utils/utils";
import { TaskType } from "@/types/calendar-types";

interface CalendarDataExporterProps {
  tasks: TaskType[];
}
const CalendarDataExporter: React.FC<CalendarDataExporterProps> = ({
  tasks,
}) => {
  const handleExportCalendarData = () => {
    exportCalendarDataToJsonFile(tasks);
  };

  return (
    <Button onClick={handleExportCalendarData}>Export calendar data</Button>
  );
};

export default CalendarDataExporter;
