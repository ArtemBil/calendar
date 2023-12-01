import React from "react";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import Modal from "@/app/components/UI/Modal";
import useTaskEditModal from "@/hooks/useTaskEditModal";
import { LabelType } from "@/types/calendar-types";

interface TaskEditModalProps {
  open: boolean;
  content: string;
  labels: LabelType[];
  handleClose: Function;
  handleUpdate: Function;
}
const TaskCardEditModal: React.FC<TaskEditModalProps> = ({
  open,
  content,
  labels,
  handleClose,
  handleUpdate,
}) => {
  const {
    actions,
    allLabels,
    taskContent,
    taskLabels,
    handleInputChange,
    handleChange,
  } = useTaskEditModal(handleUpdate, content, labels);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      header="Edit a task"
      actions={actions}
    >
      <FormControl>
        <InputLabel id="demo-multiple-chip-label">Labels</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          required={false}
          value={taskLabels}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          // @ts-ignore TODO: value accepts only primitives,
          // TODO: but we need an object to get it inside of selected items
          renderValue={(selected: LabelType[]) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map(({ id, name }: LabelType) => (
                <Chip key={id} label={name} />
              ))}
            </Box>
          )}
        >
          {allLabels.map((label: LabelType) => (
            // @ts-ignore TODO: value accepts only primitives,
            // TODO: but we need an object to get it inside of selected items
            <MenuItem key={label.id} value={label}>
              {label.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          id="standard-basic"
          label="Standard"
          required={false}
          variant="standard"
          value={taskContent}
          onChange={handleInputChange}
        />
      </FormControl>
    </Modal>
  );
};

export default TaskCardEditModal;
