import React from "react";
import { HolidayType } from "@/types/holiday-types";
import {
  HolidaysList,
  HolidaysListItem,
} from "@/app/components/UI/Holidays/style";

interface HolidaysProps {
  holidays: HolidayType[];
}
const Holidays: React.FC<HolidaysProps> = ({ holidays }) => {
  return (
    <HolidaysList className="holidays" component="ul">
      {holidays.map(({ date, localName }) => {
        return (
          <HolidaysListItem key={date + localName} component="li">
            {localName}
          </HolidaysListItem>
        );
      })}
    </HolidaysList>
  );
};

export default Holidays;
