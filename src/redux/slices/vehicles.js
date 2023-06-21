import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  selection: {},
  timeTaken: 0
};
function toCamelCase(text) {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) => {
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    })
    .replace(/\s+/g, "");
}
const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.data = action.payload.data.map((d) => {
        d.title = d.name;
        d.name = toCamelCase(d.name);
        d.count = d.total_no;
        return d;
      });
    },
    updateVehicleStatus: (state, action) => {
      const { name, value } = action.payload;
      state.selection[name] = value;
      state.data = state.data.map((d) => {
        d.count = d.total_no;
        return d;
      });
      let takenTime = 0;
      Object.values(state.selection).forEach((val) => {
        const ind = state.data.findIndex((v) => v.name === val);
        if (ind >= 0) {
          state.data[ind].count = state.data[ind].count - 1;
        }
      });
      state.timeTaken = takenTime;
    },
    resetVehicleSelections: (state, action) => {
      state.selection = {};
      state.data = state.data.map((d) => {
        d.count = d.total_no;
        return d;
      });
    }
  }
});

export const {
  setVehicles,
  updateVehicleStatus,
  resetVehicleSelections
} = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
