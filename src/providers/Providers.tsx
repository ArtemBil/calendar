import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import CalendarProvider from "@/providers/CalendarProvider";
import { CalendarType } from "@/types/calendar-types";
import { createTheme, ThemeProvider } from "@mui/material";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

interface ProvidersProps {
  children: React.ReactNode;
  calendarData: CalendarType[];
}

const materialTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
          margin: "12px 8px 16px 0",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
  },
});

const Providers: React.FC<ProvidersProps> = ({ children, calendarData }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <CalendarProvider data={calendarData}>
        <ThemeProvider theme={materialTheme}>{children}</ThemeProvider>
      </CalendarProvider>
    </DndProvider>
  );
};

export default Providers;
