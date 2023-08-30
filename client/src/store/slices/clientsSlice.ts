import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IClient } from '../../types/client';
import { IClientsState } from '../../types/clientsState';

const initialState: IClientsState = {
  list: [],
}

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, actions: PayloadAction<IClient[]>) => {
      state.list = actions.payload
    },
  },
});

export const { setClients } = clientsSlice.actions;
export default clientsSlice.reducer;