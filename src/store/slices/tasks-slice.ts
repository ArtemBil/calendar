import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LabelType, TaskType } from "@/types/calendar-types";

const initialState: TaskType[] | [] = [];

type UpdateTaskPayloadAction = {
  id: string;
  key: string;
  content?: TaskType["content"];
  labels?: LabelType[];
  previousLabels?: LabelType[];
};
export const loadTasks = createAsyncThunk(
  "tasks/load",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch("/api/tasks");
      const tasks = await response.json();
      dispatch(setTasks(tasks));
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue({ error: e.message });
      }
    }
  },
);

export const updateTask = createAsyncThunk<
  { id: string; content?: string; labels?: LabelType[] },
  UpdateTaskPayloadAction
>("tasks/update", async (payload, { rejectWithValue }) => {
  const { id, key, content, labels, previousLabels } = payload;

  try {
    if (content && !labels) {
      const response = await fetch("/api/tasks/update", {
        method: "POST",
        body: JSON.stringify({
          id,
          field: "content",
          value: content,
        }),
      });

      if (response.ok) {
        return { id, content };
      }

      return Promise.reject(response.statusText);
    }

    if (!content && labels) {
      const response = await fetch("/api/tasks/update", {
        method: "POST",
        body: JSON.stringify({
          id,
          field: "labels",
          value: labels,
        }),
      });

      if (response.ok) {
        return { id, labels };
      }

      return Promise.reject(response.statusText);
    }
    if (content && labels) {
      const response = await fetch("/api/tasks/update", {
        method: "POST",
        body: JSON.stringify({
          id,
          field: "all",
          previousLabels,
          value: {
            content,
            labels,
          },
        }),
      });

      if (response.ok) {
        return { id, labels, content };
      }

      return Promise.reject(response.statusText);
    }

    return Promise.reject("Nothing was updated");
  } catch (e) {
    return rejectWithValue(e);
  }
});

type UpdateTaskPositionThunk = {
  id: string;
  currentPosition: string;
  targetPosition: string;
};
export const updateTaskPosition = createAsyncThunk<
  UpdateTaskPositionThunk,
  UpdateTaskPositionThunk
>("tasks/updatePosition", async (payload, { rejectWithValue }) => {
  try {
    const { id: taskId, currentPosition, targetPosition } = payload;

    const response = await fetch("/api/tasks/update", {
      method: "POST",
      body: JSON.stringify({
        id: taskId,
        field: "updatePosition",
        value: targetPosition,
      }),
    });

    if (response.ok) {
      return { id: taskId, currentPosition, targetPosition };
    }

    return Promise.reject(response.statusText);
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const updateTaskOrder = createAsyncThunk<
  void,
  { id: string; currentOrder: number; newOrder: number; cellKey: string }
>("tasks/updateOrder", async (payload, { dispatch, rejectWithValue }) => {
  try {
    const { id: taskId, currentOrder, newOrder, cellKey } = payload;

    const response = await fetch("/api/tasks/update", {
      method: "POST",
      body: JSON.stringify({
        id: taskId,
        field: "updateOrder",
        newOrder,
        currentOrder,
        cellKey,
      }),
    });

    if (response.ok) {
      dispatch(loadTasks());
    }
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue(e);
    }
  }
});

export const createTask = createAsyncThunk<TaskType, Omit<TaskType, "id">>(
  "tasks/create",
  async (payload, { rejectWithValue }) => {
    const { content, calendarId, labels, orderNumber } = payload;

    try {
      const response = await fetch("/api/tasks/create", {
        method: "POST",
        body: JSON.stringify({
          content: content,
          calendarId,
          orderNumber,
          ...(labels && labels.length && { labels }),
        }),
      });

      if (response.ok) {
        const { id } = await response.json();

        return { id, ...payload };
      }

      return Promise.reject(response.statusText);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const deleteTask = createAsyncThunk<void, { id: string }>(
  "tasks/create",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch("/api/tasks/delete", {
        method: "DELETE",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        dispatch(loadTasks());
      }

      return Promise.reject(response.statusText);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const importTasks = createAsyncThunk(
  "tasks/import",
  async (importedTasks: BodyInit, { dispatch }) => {
    try {
      const response = await fetch("/api/tasks/import", {
        method: "POST",
        body: importedTasks,
      });

      const { tasks } = await response.json();
      dispatch(setTasks(tasks));
    } catch (e) {
      console.log(e);
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const { id, labels, content } = action.payload;
      const stateTask = state.find((task) => task.id === id);

      if (!stateTask) return;

      if (content) {
        stateTask.content = content;
      }

      if (labels && labels.length) {
        stateTask.labels = labels;
      }
    });

    builder.addCase(
      updateTaskPosition.fulfilled,
      (state: TaskType[], action) => {
        const { id, currentPosition, targetPosition } = action.payload;

        return state.map((task) => {
          const taskToUpdate =
            task.calendarId === currentPosition && task.id === id;
          return taskToUpdate ? { ...task, calendarId: targetPosition } : task;
        });
      },
    );

    builder.addCase(
      createTask.fulfilled,
      (state, action: PayloadAction<TaskType>) => {
        const newTask = action.payload;
        return [...state, newTask];
      },
    );
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
