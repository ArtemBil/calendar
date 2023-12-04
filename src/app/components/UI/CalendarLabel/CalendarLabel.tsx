import React from "react";
import { LabelType } from "@/types/calendar-types";
import {
  CalendarLabelList,
  CalendarLabelListItem,
} from "@/app/components/UI/CalendarLabel/style";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { styled } from "@mui/system";

type CalendarLabelProps = {
  labels: LabelType[];
};

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
  },
}));

const CalendarLabel: React.FC<CalendarLabelProps> = ({ labels }) => {
  if (!labels.length) {
    return null;
  }

  return (
    <CalendarLabelList component="ul">
      {labels.map(({ id, color, name }) => {
        return (
          <BootstrapTooltip key={id} title={name} placement="top">
            <CalendarLabelListItem component="li" color={color} />
          </BootstrapTooltip>
        );
      })}
    </CalendarLabelList>
  );
};

export default CalendarLabel;
