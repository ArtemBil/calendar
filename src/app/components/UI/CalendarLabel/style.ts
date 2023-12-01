import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const CalendarLabelList = styled(Box)({
  display: "flex",
  gap: "3px",
  listStyle: "none",
  marginBottom: "4px",
});

export const CalendarLabelListItem = styled(Box)(
  (props: { color: string }) => ({
    backgroundColor: props.color,
    width: "32px",
    height: "8px",
    borderRadius: "5px",
  }),
);
