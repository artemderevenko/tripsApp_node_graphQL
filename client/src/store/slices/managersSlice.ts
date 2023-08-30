import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IManager } from '../../types/manager';
import { IManagersState } from '../../types/managersState';

const initialState: IManagersState = {
  list: [],
}

const managersSlice = createSlice({
  name: 'managers',
  initialState,
  reducers: {
    setManagers: (state, actions: PayloadAction<IManager[]>) => {
      state.list = actions.payload
    },
  },
});

export const { setManagers } = managersSlice.actions;
export default managersSlice.reducer;