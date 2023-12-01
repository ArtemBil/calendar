import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import { importCalendarDataFromJsonFile } from "@/utils/utils";
import { useAppDispatch } from "@/hooks/store/hooks";
import { setTasks } from "@/store/slices/tasks-slice";

const CalendarDataImporter = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState();
  const handleImportCalendarData = (event) => {
    importCalendarDataFromJsonFile(event, (importedData) => {
      if (importedData) {
        setData(importedData);
      }
    });
  };

  const handleSaveImportedCalendarData = useCallback(() => {
    dispatch(setTasks(data));
  }, [data]);

  return data ? (
    <Button onClick={handleSaveImportedCalendarData}>Apply Data</Button>
  ) : (
    <TextField
      type="file"
      inputProps={{
        accept: "application/json",
      }}
      onChange={handleImportCalendarData}
      placeholder="Import calendar data"
    />
  );
};

export default CalendarDataImporter;
