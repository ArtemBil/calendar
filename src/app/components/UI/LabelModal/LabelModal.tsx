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
} from "@/app/components/UI/CreateLabelModal/style";
import { useLabelModal } from "@/hooks/useLabelModal";
import { ActionsType } from "@/types/modal-types";
import { LabelType } from "@/types/calendar-types";

interface CreateLabelModalProps {
  open: boolean;
  handleClose: Function;
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
  } = useLabelModal(handleClose, actions, currentLabelInfo);

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
          id="standard-basic"
          label="Label name"
          required={false}
          variant="standard"
          value={labelName}
          onChange={handleInputChange}
        />
      </FormControl>
    </Modal>
  );
};

export default LabelModal;
