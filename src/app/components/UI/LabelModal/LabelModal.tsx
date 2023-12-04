import React from "react";
import { FormControl, TextField } from "@mui/material";
import { SketchPicker } from "react-color";
import Modal from "@/app/components/UI/Modal";
import {
  ColorPickerBox,
  ColorPickerContainer,
  ColorPickerFieldContainer,
  ColorPickerOverlay,
  SelectedColorBox,
} from "@/app/components/UI/LabelModal/style";
import { useLabelModal } from "@/app/components/UI/LabelModal/useLabelModal";
import { ActionsType, OnModalClose } from "@/types/modal-types";
import { LabelType } from "@/types/calendar-types";

interface CreateLabelModalProps {
  open: boolean;
  handleClose: OnModalClose;
  actions: ActionsType[];
  header: string;
  currentLabelInfo?: LabelType;
}

const LabelModal: React.FC<CreateLabelModalProps> = ({
  open,
  handleClose,
  actions,
  header,
  currentLabelInfo,
}) => {
  const {
    labelColor,
    labelName,
    actionsWithData,
    colorPickerVisible,
    onColorPickerChange,
    onColorPickBoxClick,
    onColorPickerOverlayClick,
    handleInputChange,
  } = useLabelModal(actions, currentLabelInfo);

  return (
    <Modal
      header={header}
      open={open}
      handleClose={handleClose}
      actions={actionsWithData}
    >
      <ColorPickerFieldContainer>
        Label Color (click to select):
        <ColorPickerBox onClick={onColorPickBoxClick}>
          <SelectedColorBox labelColor={labelColor} />
        </ColorPickerBox>
      </ColorPickerFieldContainer>
      {colorPickerVisible ? (
        <ColorPickerContainer>
          <ColorPickerOverlay onClick={onColorPickerOverlayClick} />
          <SketchPicker
            disableAlpha={true}
            width="235px"
            color={labelColor}
            onChange={onColorPickerChange}
          />
        </ColorPickerContainer>
      ) : null}

      <FormControl>
        <TextField
          error={!labelName.length}
          id="standard-basic"
          label="Label name"
          required={true}
          variant="outlined"
          value={labelName}
          onChange={handleInputChange}
          helperText={!labelName.length && "This is a required field"}
        />
      </FormControl>
    </Modal>
  );
};

export default LabelModal;
