import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const WeekDaysList = styled(Box)({
  display: "flex",
  listStyle: "none",
  justifyContent: "space-between",
  textAlign: "center",
  gap: "6px",
});

export const WeekDaysListItem = styled(Box, {
  shouldForwardProp(propName: PropertyKey): propName is ForwardedProps {
    return propName !== "weekDays";
  },
})(({ weekDays }) => ({
  flexBasis: `calc(100% / ${weekDays.length})`,
  padding: "12px",
  borderBottom: "4px solid #E2E4E6",
  borderRadius: "50px",
}));
