import React from "react";
import { Button } from "@mui/material";
import { downloadCalendarHtmlAsImage } from "@/utils/utils";

const CalendarDataHtmlToImageSaver = ({ calendarRef }) => {
  const handeSaveAsImage = () => {
    downloadCalendarHtmlAsImage(calendarRef);
  };

  return <Button onClick={handeSaveAsImage}>Save calendar as an image</Button>;
};

export default CalendarDataHtmlToImageSaver;
