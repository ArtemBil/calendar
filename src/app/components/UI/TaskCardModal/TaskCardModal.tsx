import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// const labels = ["Urgent", "Medium", ""];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TaskCardModal = ({ open, handleClose, handleSave }) => {
  const labels = useSelector((state) => state.labels);

  const [labelNames, setLabelName] = React.useState<string[]>([]);
  const [cardContent, setCardContent] = useState("");

  const handleChange = (event: SelectChangeEvent<typeof labelNames>) => {
    const {
      target: { value },
    } = event;

    setLabelName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleSaveClick = (event) => {
    handleSave(labelNames, cardContent);
    setCardContent("");
    setLabelName([]);
    handleClose(event);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style }}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Labels</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            required={false}
            value={labelNames}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map(({ id, name }) => (
                  <Chip key={id} label={name} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {labels.map((label) => (
              <MenuItem
                key={label.id}
                value={label}
                // style={getStyles(name, labelName, theme)}
              >
                {label.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <TextField
            id="standard-basic"
            label="Standard"
            required={false}
            variant="standard"
            value={cardContent}
            onChange={(event) => setCardContent(event.target.value)}
          />
        </FormControl>
        <Button onClick={handleSaveClick}>Save</Button>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default TaskCardModal;
