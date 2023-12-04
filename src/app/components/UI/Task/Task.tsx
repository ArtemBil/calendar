import React, { MutableRefObject, useRef } from "react";
import CalendarLabel from "@/app/components/UI/CalendarLabel";
import useTask from "@/app/components/UI/Task/useTask";
import { TaskType } from "@/types/calendar-types";
import { TaskBox } from "@/app/components/UI/Task/style";
import TaskModal from "@/app/components/UI/TaskModal";

interface TaskProps {
  task: TaskType;
  cellKey: string;
  index: number;
}
const Task: React.FC<TaskProps> = ({ task, cellKey, index }) => {
  const { open, handleOpen, actions, drag, drop, taskRef, handleClose } =
    useTask(task, cellKey, index);
  const { id, content, labels } = task;
  const taskBoxRef = drag(
    drop(taskRef),
  ) as unknown as MutableRefObject<HTMLDivElement>;

  return (
    <>
      <TaskBox onClick={handleOpen} ref={taskBoxRef} key={id}>
        {labels && <CalendarLabel labels={labels} />}
        {content}
      </TaskBox>
      <TaskModal
        open={open}
        header="Edit a task"
        handleClose={handleClose}
        labels={labels}
        content={content}
        taskId={id}
        actions={actions}
      />
    </>
  );
};

export default Task;
