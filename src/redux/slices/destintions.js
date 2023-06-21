import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: [],
  selection: {},
  destintions: [
    {
      label: "Destination 1",
      id: "destination1",
      name: "destination1"
    },
    {
      label: "Destination 2",
      id: "destination2",
      name: "destination2"
    },
    {
      label: "Destination 3",
      id: "destination3",
      name: "destination3"
    },
    {
      label: "Destination 4",
      id: "destination4",
      name: "destination4"
    }
  ]
};

export const destinationSlice = createSlice({
  name: "destintions",
  initialState,
  reducers: {
    setInitial: (state, action) => {
      const { planets } = action.payload;
      let planetsData = planets.map((p) => {
        return { ...p, value: p.name, selected: false };
      });
      state.options = planetsData;
    },
    updateOptions: (state, action) => {
      const { value, name } = action.payload;
      state.selection[name] = value;
      state.options = state.options.map((op) => {
        op.selected = false;
        return op;
      });
      Object.values(state.selection).forEach((val) => {
        const ind = state.options.findIndex((op) => op.value === val);
        if (state.options[ind]) {
          state.options[ind].selected = true;
        }
      });
    },
    resetDestinationSelection: (state, action) => {
      state.selection = {};
      state.destintions.forEach((d) => {
        state.selection[d.name] = "";
      });
      state.options = state.options.map((op) => {
        op.selected = false;
        return op;
      });
    }
  }
});

export const {
  setInitial,
  updateOptions,
  resetDestinationSelection
} = destinationSlice.actions;

export default destinationSlice.reducer;
