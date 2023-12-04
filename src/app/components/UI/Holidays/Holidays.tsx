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
      {holidays.map(({ date, localName, name }, index) => {
        const key = `${date}-${localName}-${name}-${index}`;
        return (
          <HolidaysListItem key={key} component="li">
            {localName}
          </HolidaysListItem>
        );
      })}
    </HolidaysList>
  );
};

export default Holidays;
