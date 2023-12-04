import React, { useRef, useState } from 'react';
import { useAppDispatch } from '@/hooks/store/hooks';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/types/item-types';
import { updateTaskPosition } from '@/store/slices/tasks-slice';

type dropProps = {
  id: string;
  currentPosition: string;
};

export default function useCalendarCell(id: string) {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const taskRef = useRef();
  const dispatch = useAppDispatch();

  const [dropInfo, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (data: dropProps) => {
      if (data.currentPosition !== id) {
        dispatch(updateTaskPosition({ ...data, targetPosition: id }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleTaskModalOpen = () => {
    setTaskModalOpen(true);
  };

  const handleTaskModalClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setTaskModalOpen(false);
  };

  return {
    taskRef,
    taskModalOpen,
    handleTaskModalOpen,
    handleTaskModalClose,
    drop,
    ...dropInfo,
  };
}
