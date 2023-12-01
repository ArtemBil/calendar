import { useCallback, useState } from "react";
import { useAppDispatch } from "@/hooks/store/hooks";
import { useDrag } from "react-dnd";
import { ItemTypes } from "@/types/item-types";
import _ from "lodash";
import { updateTask } from "@/store/slices/tasks-slice";
import { TaskType } from "@/types/calendar-types";

export default function useTask(task: TaskType, cellKey: string) {
  const { taskId, taskContent, labels } = task;
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleOpen = useCallback((event) => {
    event.stopPropagation();
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const [dragInfo, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      taskId,
      cellKey,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const editTask =
    (updatedContent: string, updatedLabels: string[]) => (event) => {
      handleClose();

      let contentIsEqual = _.isEqual(taskContent, updatedContent);
      let labelsAreEqual = _.isEqual(labels, updatedLabels);

      if (contentIsEqual && labelsAreEqual) return;

      if (contentIsEqual && !labelsAreEqual) {
        return dispatch(
          updateTask({ task, key: cellKey, labels: updatedLabels }),
        );
      }

      if (!contentIsEqual && labelsAreEqual) {
        return dispatch(
          updateTask({ task, key: cellKey, content: updatedContent }),
        );
      }

      dispatch(
        updateTask({
          task,
          key: cellKey,
          content: updatedContent,
          labels: updatedLabels,
        }),
      );
    };

  return {
    open,
    handleOpen,
    drag,
    handleClose,
    editTask,
    ...dragInfo,
  };
}
