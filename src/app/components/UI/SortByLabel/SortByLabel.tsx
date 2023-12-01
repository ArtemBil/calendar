import React from "react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { CalendarType } from "@/types/calendar-types";
import useSortByLabel from "@/hooks/useSortByLabel";

interface SortByLabelProps {
  calendar: CalendarType[];
}
const SortByLabel: React.FC<SortByLabelProps> = ({ calendar }) => {
  const { taskLabels, handleChange, allLabels } = useSortByLabel(calendar);

  return (
    <Box>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">
          Select label to filter
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          size="small"
          required={false}
          value={taskLabels}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map(({ id, name }) => (
                <Chip key={id} label={name} />
              ))}
            </Box>
          )}
        >
          {allLabels.map((label) => (
            <MenuItem key={label.id} value={label}>
              {label.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortByLabel;
