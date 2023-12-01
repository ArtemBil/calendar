import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const ListItem = styled(Box, {
  shouldForwardProp(propName: PropertyKey): propName is ForwardedProps {
    return !["isActive", "weekDays", "isToday"].includes(propName);
  },
})(
  (props: {
    isActive: boolean;
    weekDays: [];
    isToday: boolean | undefined;
  }) => ({
    background: props.isToday ? "#bcbec0" : "#E2E4E6",
    height: 200,
    padding: "8px",
    border: "2px solid #EEEFF1",
    borderRadius: "8px",
    overflow: "auto",
    cursor: "pointer",
    opacity: props.isActive ? 1 : 0.5,
    flexBasis: `calc(100% / ${props.weekDays.length})`,
  }),
);

export const CalendarCellDay = styled(Box, {
  shouldForwardProp(propName: PropertyKey): propName is ForwardedProps {
    return propName !== "isActive";
  },
})((props: { isActive: boolean | undefined }) => ({
  fontWeight: props.isActive ? "bold" : "normal",
  marginRight: "8px",
}));

export const CalendarCellCardCounter = styled(Box)({
  fontSize: "12px",
  opacity: 0.7,
  fontWeight: 600,
});

export const CalendarCellHeaderBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});