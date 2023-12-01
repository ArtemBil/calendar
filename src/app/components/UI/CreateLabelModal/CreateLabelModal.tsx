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
import { useCreateLabelModal } from "@/hooks/useCreateLabelModal";

interface CreateLabelModalProps {
  open: boolean;
  handleClose: Function;
}

const CreateLabelModal: React.FC<CreateLabelModalProps> = ({
  open,
  handleClose,
}) => {
  const {
    labelColor,
    labelName,
    actions,
    colorPickerVisible,
    onColorPickerChange,
    onColorPickBoxClick,
    onColorPickerOverlayClick,
    handleInputChange,
  } = useCreateLabelModal(handleClose);

  return (
    <Modal
      header="Create a label"
      open={open}
      handleClose={handleClose}
      actions={actions}
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

export default CreateLabelModal;
