import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITour } from '../../types/tour';
import { IToursState } from '../../types/toursState';

const initialState: IToursState = {
  list: [],
}

const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    setTours: (state, actions: PayloadAction<ITour[]>) => {
      state.list = actions.payload
    },
  },
});

export const { setTours } = toursSlice.actions;
export default toursSlice.reducer;