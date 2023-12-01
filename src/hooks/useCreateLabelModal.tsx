import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/store/hooks";
import { v1 as uuidv1 } from "uuid";
import { addLabel } from "@/store/slices/labels-slice";
import { ActionsType } from "@/types/modal-types";
import { Button } from "@mui/material";

export function useCreateLabelModal(handleClose) {
  const [labelName, setLabelName] = useState<string>("");
  const [labelColor, setLabelColor] = useState<string>("#000");
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const dispatch = useAppDispatch();

  const handleInputChange = (event) => {
    setLabelName(event.target.value);
  };

  const handleSaveLabelClick = () => {
    if (labelColor && labelName) {
      const id = uuidv1();
      dispatch(addLabel({ id, name: labelName, color: labelColor }));
    }

    handleClose();
  };

  const onColorPickerChange = (color, event) => {
    setLabelColor(color.hex);
  };

  const onColorPickBoxClick = () => {
    setColorPickerVisible(!colorPickerVisible);
  };

  const onColorPickerOverlayClick = () => {
    setColorPickerVisible(false);
  };

  const actions: ActionsType[] = [
    {
      render(): React.ReactNode {
        return <Button onClick={handleSaveLabelClick}>Create</Button>;
      },
    },
  ];

  return {
    labelName,
    colorPickerVisible,
    labelColor,
    actions,
    onColorPickBoxClick,
    onColorPickerOverlayClick,
    onColorPickerChange,
    handleInputChange,
  };
}
