import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { LabelType } from '@/types/calendar-types';
import { ActionsType, TaskActions } from '@/types/modal-types';
import { useAppSelector } from '@/hooks/store/hooks';

export default function useTaskModal(
  actions: ActionsType[],
  taskId?: string,
  labels?: LabelType[],
  content?: string,
) {
  const [taskLabels, setTaskLabels] = React.useState<LabelType[] | []>(
    labels || [],
  );
  const [inputError, setInputError] = useState(false);
  const [taskContent, setTaskContent] = useState(content || '');
  const allLabels = useAppSelector((state) => state.labels);

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    selectedOptions: LabelType[],
  ) => {
    setTaskLabels(selectedOptions);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!event.target.value) {
      setInputError(true);
    } else {
      setInputError(false);
    }

    setTaskContent(event.target.value);
  };

  const actionsWithData: ActionsType[] = actions.map((action: ActionsType) => {
    if (action.id === TaskActions.CREATE || action.id === TaskActions.UPDATE) {
      return {
        ...action,
        actionInfo: {
          content: taskContent,
          labels: taskLabels,
          afterAction: () => {
            setTaskContent('');
            setTaskLabels([]);
          },
          validate: () => {
            return !!taskContent;
          },
        },
      };
    }

    if (action.id === TaskActions.DELETE && taskId) {
      return {
        ...action,
        actionInfo: {
          id: taskId,
        },
      };
    }

    return action;
  });

  return {
    inputError,
    allLabels,
    taskLabels,
    taskContent,
    handleChange,
    handleInputChange,
    actionsWithData,
  };
}
