import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const CalendarCellsList = styled(Box)({
  display: "flex",
  listStyle: "none",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

export const CalendarDateTitle = styled(Box)({
  textAlign: "center",
  marginBottom: "24px",
});

export const CalendarActionsContainer = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: "16px",
});
