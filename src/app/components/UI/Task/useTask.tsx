import React, { useCallback, useRef, useState } from 'react';
import { useAppDispatch } from '@/hooks/store/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '@/types/item-types';
import _ from 'lodash';
import {
  updateTask,
  updateTaskOrder,
  deleteTask as deleteTaskAction,
} from '@/store/slices/tasks-slice';
import { LabelType, TaskType } from '@/types/calendar-types';
import { ActionsType, TaskActions } from '@/types/modal-types';
import { Button } from '@mui/material';

export default function useTask(
  task: TaskType,
  cellKey: string,
  index: number,
) {
  const taskRef = useRef();
  const { id, calendarId, content, labels } = task;
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpen(true);
  }, []);
  const [canDrop, setCanDrop] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [dragInfo, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      id,
      currentPosition: calendarId,
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [dropInfo, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: async (data) => {
      setCanDrop(false);
      await dispatch(
        updateTaskOrder({
          id: dropInfo.item.id,
          newOrder: index,
          currentOrder: dropInfo.item.index,
          cellKey,
        }),
      );
      setCanDrop(true);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handlerId: monitor.getHandlerId(),
      item: monitor.getItem() as TaskType & { index: number },
    }),
    canDrop(item, monitor) {
      return canDrop;
    },
  });

  const editTask =
    ({
      content: updatedContent,
      labels: updatedLabels,
      validate,
    }: {
      content: string;
      labels: LabelType[];
      validate: () => boolean;
    }) =>
    () => {
      if (validate()) {
        handleClose();

        let contentIsEqual = _.isEqual(content, updatedContent);
        let labelsAreEqual = _.isEqual(labels, updatedLabels);

        if (contentIsEqual && labelsAreEqual) return;

        if (contentIsEqual && !labelsAreEqual) {
          return dispatch(
            updateTask({
              id,
              key: cellKey,
              previousLabels: labels,
              labels: updatedLabels,
            }),
          );
        }

        if (!contentIsEqual && labelsAreEqual) {
          return dispatch(
            updateTask({ id, key: cellKey, content: updatedContent }),
          );
        }

        dispatch(
          updateTask({
            id,
            key: cellKey,
            content: updatedContent,
            previousLabels: labels,
            labels: updatedLabels,
          }),
        );
      }
    };

  const deleteTask = (actionInfo: { id: string }) => () => {
    handleClose();
    dispatch(deleteTaskAction(actionInfo));
  };

  const actions: ActionsType[] = [
    {
      id: TaskActions.UPDATE,
      render(actionInfo): React.ReactNode {
        return <Button onClick={editTask(actionInfo)}>Update</Button>;
      },
    },
    {
      id: TaskActions.DELETE,
      render(actionInfo): React.ReactNode {
        return <Button onClick={deleteTask(actionInfo)}>Delete</Button>;
      },
    },
  ];

  return {
    open,
    handleOpen,
    drag,
    drop,
    taskRef,
    handleClose,
    editTask,
    actions,
    ...dragInfo,
  };
}
