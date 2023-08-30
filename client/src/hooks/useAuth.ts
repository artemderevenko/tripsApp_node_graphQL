import { useAppdSelector } from './reduxHook';

import { IUseAuth } from '../types/useAuth';

export const useAuth = (): IUseAuth => {
  const { email, token, id, isFetchingAuth } = useAppdSelector(state => state.user);

  return {
    isAuth: !!email,
    email,
    token,
    id,
    isFetchingAuth,
  };
}