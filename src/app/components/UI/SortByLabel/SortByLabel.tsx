import React from "react";
import { Autocomplete, FormControl, MenuItem, TextField } from "@mui/material";
import { CalendarType } from "@/types/calendar-types";
import useSortByLabel from "@/app/components/UI/SortByLabel/useSortByLabel";
import { Check } from "@mui/icons-material";

interface SortByLabelProps {
  calendar: CalendarType[];
}
const SortByLabel: React.FC<SortByLabelProps> = ({ calendar }) => {
  const { handleChange, allLabels } = useSortByLabel(calendar);

  return (
    <FormControl>
      <Autocomplete
        multiple
        options={allLabels}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
        onChange={handleChange}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search by label"
            placeholder="Search/Select labels"
          />
        )}
        renderOption={(props, option, { selected }) => (
          <MenuItem
            {...props}
            key={option.id}
            value={option.name}
            sx={{ justifyContent: "space-between" }}
          >
            {option.name}
            {selected ? <Check color="info" /> : null}
          </MenuItem>
        )}
      />
    </FormControl>
  );
};

export default SortByLabel;
