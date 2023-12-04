import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LabelType } from "@/types/calendar-types";

const initialState: LabelType[] | [] = [];

export const loadLabels = createAsyncThunk(
  "labels/load",
  async (_, { dispatch }) => {
    const response = await fetch("/api/labels");
    console.log(response);
    const labels = await response.json();
    dispatch(setLabels(labels));
  },
);

export const createLabel = createAsyncThunk<void | Error, LabelType>(
  "labels/create",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch("/api/labels/create", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      dispatch(addLabel(payload));
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e);
      }
    }
  },
);

export const deletedLabel = createAsyncThunk<
  void | Error,
  { id: LabelType["id"] }
>("labels/delete", async (payload, { dispatch, rejectWithValue }) => {
  try {
    const response = await fetch("/api/labels/delete", {
      method: "DELETE",
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      dispatch(loadLabels());
    }
  } catch (e) {
    if (e instanceof Error) {
      return rejectWithValue(e);
    }
  }
});

export const updateLabel = createAsyncThunk<LabelType, LabelType>(
  "labels/update",
  async (payload, { rejectWithValue }) => {
    const { id, name, color } = payload;

    try {
      const response = await fetch("/api/labels/update", {
        method: "POST",
        body: JSON.stringify({
          id,
          field: "all",
          value: {
            name,
            color,
          },
        }),
      });

      if (response.ok) {
        return payload;
      }

      return Promise.reject(response.statusText);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const labelsSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    addLabel(state, action: PayloadAction<LabelType>) {
      return [...state, action.payload];
    },
    setLabels(state, action) {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      updateLabel.fulfilled,
      (state, action: PayloadAction<LabelType>) => {
        const labelIndex = state.findIndex(
          (label) => label.id === action.payload.id,
        );

        state[labelIndex] = action.payload;

        return state;
      },
    );
  },
});

export const { addLabel, setLabels } = labelsSlice.actions;
export default labelsSlice.reducer;
