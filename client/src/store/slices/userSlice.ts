import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../types/user';

const initialState: IUser = {
  email: null,
  token: null,
  id: null,
  isFetchingAuth: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<IUser>) => {
      state.email = actions.payload.email;
      state.token = actions.payload.token;
      state.id = actions.payload.id;
      state.isFetchingAuth = actions.payload.isFetchingAuth;
    },
    removeUser: (state) => {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isFetchingAuth = false;
    },
    changefetchStatus: (state, actions: PayloadAction<boolean>) => {
      state.isFetchingAuth = actions.payload;
    },
  },
});

export const { setUser, removeUser, changefetchStatus } = userSlice.actions;
export default userSlice.reducer;