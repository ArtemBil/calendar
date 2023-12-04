import React from 'react';
import { Autocomplete, FormControl, MenuItem, TextField } from '@mui/material';
import useSortByLabel from '@/app/components/UI/SortByLabel/useSortByLabel';
import { Check } from '@mui/icons-material';
import useCalendarProvider from '@/hooks/useCalendarProvider';

const SortByLabel = () => {
  const calendar = useCalendarProvider();
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
          <MenuItem key={props.id} value={option.name} {...props}>
            {option.name}
            {selected ? <Check color="info" /> : null}
          </MenuItem>
        )}
      />
    </FormControl>
  );
};

export default SortByLabel;
