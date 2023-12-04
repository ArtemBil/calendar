import { ChangeEvent, useEffect, useState } from 'react';
import { ActionsType, LabelActions } from '@/types/modal-types';
import { LabelType } from '@/types/calendar-types';
import { ColorChangeHandler, ColorResult } from 'react-color';

export function useLabelModal(
  actions: ActionsType[],
  currentLabelInfo: LabelType | undefined,
) {
  const [labelInfo, setLabelInfo] = useState<LabelType>({
    color: '',
    id: '',
    name: '',
  });
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    if (currentLabelInfo) {
      setLabelInfo((prevState) => ({ ...prevState, ...currentLabelInfo }));
    }
  }, [currentLabelInfo]);
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!event.target.value) {
      setInputError(true);
    } else {
      setInputError(false);
    }

    setLabelInfo((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const onColorPickerChange = (color: ColorResult) => {
    setLabelInfo((prevState) => ({ ...prevState, color: color.hex }));
  };

  const onColorPickBoxClick = () => {
    setColorPickerVisible(!colorPickerVisible);
  };

  const onColorPickerOverlayClick = () => {
    setColorPickerVisible(false);
  };

  const actionsWithData = actions.map((action: ActionsType) => {
    if (
      action.id === LabelActions.CREATE ||
      action.id === LabelActions.UPDATE
    ) {
      return {
        ...action,
        actionInfo: {
          ...labelInfo,
          afterAction: () => {
            setLabelInfo({
              name: '',
              color: '',
              id: '',
            });
          },
          validate: () => {
            return !!labelInfo.name && !!labelInfo.color;
          },
        },
      };
    }

    if (action.id === LabelActions.DELETE && labelInfo.id) {
      return {
        ...action,
        actionInfo: {
          id: labelInfo.id,
        },
      };
    }

    return action;
  });

  return {
    inputError,
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
