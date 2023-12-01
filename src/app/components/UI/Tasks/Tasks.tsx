import React from "react";
import { Box } from "@mui/material";
import Task from "@/app/components/UI/Task";
import { TasksType, TaskType } from "@/types/calendar-types";
import TaskCardModal from "@/app/components/UI/TaskCardModal";
import useTasks from "@/hooks/useTasks";
import { TaskContainer } from "@/app/components/UI/Tasks/style";

interface TasksProps {
  tasks: TaskType[] | undefined;
  cellKey: string;
  open: boolean;
  handleClose: Function;
}

const Tasks: React.FC<TasksProps> = ({ tasks, cellKey, open, handleClose }) => {
  const { handleSave, handleOnClick } = useTasks(tasks, cellKey);

  return (
    <>
      {tasks?.length ? (
        <TaskContainer onClick={handleOnClick}>
          {tasks && tasks.length
            ? tasks.map((task, index, array) => {
                return <Task key={cellKey} task={task} cellKey={cellKey} />;
              })
            : null}
        </TaskContainer>
      ) : null}

      <TaskCardModal
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </>
  );
};

export default Tasks;
