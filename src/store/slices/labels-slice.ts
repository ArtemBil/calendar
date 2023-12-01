import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LabelType } from "@/types/calendar-types";

const initialState: LabelType[] | [] = [
  {
    id: "8fa5bda0-8eb6-11ee-a14f-bdc96db0bf86",
    name: "Upper Intermeditae",
    color: "#eb0000",
  },
  {
    id: "94074300-8eb6-11ee-a14f-bdc96320bf86",
    name: "Upper Intermeditae 2",
    color: "#9c6e6e",
  },
];

const labelsSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    addLabel(state, action: PayloadAction<LabelType>) {
      return [...state, action.payload];
    },
    updateLabel(state, action: PayloadAction<LabelType>) {
      const labelIndex = state.findIndex(
        (label) => label.id === action.payload.id,
      );

      state[labelIndex] = action.payload;
    },
  },
});

export const { addLabel, updateLabel } = labelsSlice.actions;
export default labelsSlice.reducer;
