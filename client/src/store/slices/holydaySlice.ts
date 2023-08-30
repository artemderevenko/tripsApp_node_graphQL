import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IHoliday } from '../../types/holiday';
import { IHolidayState } from '../../types/holidayState';

const initialState: IHolidayState = {
  list: [],
}

const holidaySlice = createSlice({
  name: 'holiday',
  initialState,
  reducers: {
    addHolidays: (state, actions: PayloadAction<Array<Array<{}> | IHoliday[]>> ) => {
      state.list = actions.payload
    }
  },
});

export const { addHolidays } = holidaySlice.actions;
export default holidaySlice.reducer;