import { createSlice, current } from "@reduxjs/toolkit";
import { v1 as uuidv1 } from "uuid";

export interface TasksInterface {
  [key: string]: [
    {
      taskId: string;
      taskContent: string;
      labels: string[];
    },
  ];
}

const initialState: TasksInterface | {} = {};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state: TasksInterface, action) => {
      const { dateKey, content, labels } = action.payload;
      const id = uuidv1();
      const taskId = `${dateKey}-${id}`;

      if (Array.isArray(state[dateKey])) {
        const newTask = { taskId, taskContent: content, labels };

        state[dateKey] = [...state[dateKey], newTask];
      } else {
        state[dateKey] = [
          {
            taskId,
            taskContent: content,
            labels,
          },
        ];
      }
    },
    deleteTask: (state, action) => {},
    updateTaskPosition: (state: TasksInterface, action) => {
      console.log("Trigger");
      const { cellKey, key: targetCellKey, taskId } = action.payload;
      const draftState = current(state);
      const tasks = draftState[cellKey];
      const task = tasks.find((task) => task.taskId === taskId);

      state[cellKey] = tasks.filter((task) => task.taskId !== taskId);

      if (Array.isArray(state[targetCellKey])) {
        const newTask = task;

        state[targetCellKey] = [...state[targetCellKey], newTask];
      } else {
        state[targetCellKey] = [task];
      }
    },
    updateTask: (state: TasksInterface, action) => {
      const { task: currentTask, key, content, labels } = action.payload;
      const stateTask = state[key].find(
        (task) => task.taskId === currentTask.taskId,
      );
      if (!stateTask) return;

      if (content) {
        stateTask.taskContent = content;
        return;
      }

      if (labels.length) {
        stateTask.labels = labels;
      }
    },
    setTasks: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { addTask, deleteTask, updateTask, updateTaskPosition, setTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
