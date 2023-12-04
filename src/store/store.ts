import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasks-slice';
import labelsReducer from './slices/labels-slice';
import filtersReducer from './slices/filters-slice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    labels: labelsReducer,
    filteredTasks: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
