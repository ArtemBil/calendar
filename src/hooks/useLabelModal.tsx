import { useEffect, useState } from "react";
import { ActionsType, LabelActions } from "@/types/modal-types";
import { LabelType } from "@/types/calendar-types";

export function useLabelModal(
  handleClose,
  actions: ActionsType[],
  currentLabelInfo: LabelType,
) {
  const [labelInfo, setLabelInfo] = useState<LabelType>({
    color: "",
    id: "",
    name: "",
  });
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  useEffect(() => {
    if (currentLabelInfo) {
      setLabelInfo((prevState) => ({ ...prevState, ...currentLabelInfo }));
    }
  }, [currentLabelInfo]);
  const handleInputChange = (event) => {
    setLabelInfo((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const onColorPickerChange = (color, event) => {
    setLabelInfo((prevState) => ({ ...prevState, color: color.hex }));
  };

  const onColorPickBoxClick = () => {
    setColorPickerVisible(!colorPickerVisible);
  };

  const onColorPickerOverlayClick = () => {
    setColorPickerVisible(false);
  };

  const actionsWithData = actions.map((action: ActionsType) => {
    return action.id === LabelActions.CREATE ||
      action.id === LabelActions.UPDATE
      ? {
          ...action,
          actionInfo: labelInfo,
        }
      : action;
  });

  return {
    labelName: labelInfo.name,
    colorPickerVisible,
    labelColor: labelInfo.color,
    actions,
    onColorPickBoxClick,
    onColorPickerOverlayClick,
    onColorPickerChange,
    handleInputChange,
    actionsWithData,
  };
}
