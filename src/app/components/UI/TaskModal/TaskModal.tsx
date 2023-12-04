import React from "react";
import Modal from "@/app/components/UI/Modal";
import { Autocomplete, FormControl, MenuItem, TextField } from "@mui/material";
import useTaskModal from "@/app/components/UI/TaskModal/useTaskModal";
import { Check } from "@mui/icons-material";
import { LabelType } from "@/types/calendar-types";
import { ActionsType, OnModalClose } from "@/types/modal-types";

interface TaskModalProps {
  open: boolean;
  header: string;
  taskId?: string;
  content?: string;
  labels?: LabelType[];
  handleClose: OnModalClose;
  actions: ActionsType[];
}
const TaskModal: React.FC<TaskModalProps> = ({
  open,
  content,
  taskId,
  labels,
  handleClose,
  header,
  actions,
}) => {
  const {
    actionsWithData,
    taskContent,
    taskLabels,
    allLabels,
    handleChange,
    handleInputChange,
  } = useTaskModal(actions, taskId, labels, content);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      header={header}
      actions={actionsWithData}
    >
      <Autocomplete
        multiple
        options={allLabels}
        getOptionLabel={(option) => option.name}
        defaultValue={taskLabels}
        isOptionEqualToValue={(option: LabelType, value: LabelType) => {
          return option.id === value.id;
        }}
        onChange={handleChange}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Labels"
            placeholder="Search/Select labels"
          />
        )}
        renderOption={(props, option: LabelType, { selected }) => (
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
      <FormControl>
        <TextField
          error={!taskContent.length}
          id="standard-basic"
          label="Task content"
          multiline
          required={true}
          value={taskContent}
          onChange={handleInputChange}
          variant="filled"
          helperText={!taskContent.length && "This is a required field"}
        />
      </FormControl>
    </Modal>
  );
};

export default TaskModal;
