import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/store/hooks";
import { useDrop } from "react-dnd";
import { ItemTypes } from "@/types/item-types";
import { updateTaskPosition } from "@/store/slices/tasks-slice";

type dropProps = {
  taskId: string;
  cellKey: string;
};

export default function useCalendarCell(id: string) {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const [dropInfo, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (data: dropProps) => {
      dispatch(updateTaskPosition({ ...data, key: id }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // for some reason component is set as li item but event onClick expects HTMLDivElement
  const handleTaskModalOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setTaskModalOpen(true);
  };

  const handleTaskModalClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setTaskModalOpen(false);
  };

  return {
    taskModalOpen,
    handleTaskModalOpen,
    handleTaskModalClose,
    drop,
    ...dropInfo,
  };
}
