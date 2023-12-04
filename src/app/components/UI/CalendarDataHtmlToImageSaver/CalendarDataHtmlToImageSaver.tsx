import React, { MutableRefObject } from 'react';
import { Button } from '@mui/material';
import { downloadCalendarHtmlAsImage } from '@/utils/utils';

interface CalendarDataHtmlToImageSaverProps {
  calendarRef: MutableRefObject<HTMLDivElement | null>;
}

const CalendarDataHtmlToImageSaver: React.FC<
  CalendarDataHtmlToImageSaverProps
> = ({ calendarRef }) => {
  const handeSaveAsImage = () => {
    downloadCalendarHtmlAsImage(calendarRef);
  };

  return <Button onClick={handeSaveAsImage}>Save calendar as an image</Button>;
};

export default CalendarDataHtmlToImageSaver;
