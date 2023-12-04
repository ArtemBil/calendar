import React, { ChangeEvent, useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import { importCalendarDataFromJsonFile } from "@/utils/utils";
import { useAppDispatch } from "@/hooks/store/hooks";
import { importTasks } from "@/store/slices/tasks-slice";

const CalendarDataImporter = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<string | ArrayBuffer | null>("");
  const handleImportCalendarData = (event: ChangeEvent<HTMLInputElement>) => {
    importCalendarDataFromJsonFile(event, (importedData) => {
      if (importedData) {
        setData(importedData);
      }
    });
  };

  const handleSaveImportedCalendarData = useCallback(() => {
    // TODO: I think we can make some check to compare the imported tasks and current tasks
    //  to prevent making api request if everything is up  to date
    if (data) {
      dispatch(importTasks(data));
    }
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
