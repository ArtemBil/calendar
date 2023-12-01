import React from "react";
import CalendarLabel from "@/app/components/UI/CalendarLabel";
import TaskCardEditModal from "@/app/components/UI/TaskCardEditModal";
import useTask from "@/hooks/useTask";
import { TaskType } from "@/types/calendar-types";
import { TaskBox } from "@/app/components/UI/Task/style";

interface TaskProps {
  task: TaskType;
  cellKey: string;
}
const Task: React.FC<TaskProps> = ({ task, cellKey }) => {
  const { open, handleOpen, drag, handleClose, editTask } = useTask(
    task,
    cellKey,
  );
  const { taskId, taskContent, labels } = task;

  return (
    <>
      <TaskBox onClick={handleOpen} ref={drag} key={taskId}>
        <CalendarLabel labels={labels} />
        {taskContent}
      </TaskBox>
      <TaskCardEditModal
        open={open}
        handleClose={handleClose}
        handleUpdate={editTask}
        labels={labels}
        content={taskContent}
      />
    </>
  );
};

export default Task;
