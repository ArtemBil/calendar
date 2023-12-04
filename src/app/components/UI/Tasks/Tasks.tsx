import React from 'react';
import Task from '@/app/components/UI/Task';
import { TaskType } from '@/types/calendar-types';
import useTasks from '@/app/components/UI/Tasks/useTasks';
import { TaskContainer } from '@/app/components/UI/Tasks/style';
import TaskModal from '@/app/components/UI/TaskModal';
import { OnModalClose } from '@/types/modal-types';

interface TasksProps {
  tasks: TaskType[] | undefined;
  cellKey: string;
  open: boolean;
  handleClose: OnModalClose;
}

const Tasks: React.FC<TasksProps> = ({ tasks, cellKey, open, handleClose }) => {
  const { actions, handleOnClick } = useTasks(tasks, cellKey, handleClose);

  return (
    <>
      {tasks?.length ? (
        <TaskContainer onClick={handleOnClick}>
          {tasks && tasks.length
            ? tasks.map((task, index) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    cellKey={cellKey}
                    index={index}
                  />
                );
              })
            : null}
        </TaskContainer>
      ) : null}
      <TaskModal
        open={open}
        handleClose={handleClose}
        header="Create a Task"
        actions={actions}
      />
    </>
  );
};

export default Tasks;
