import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';

const RequireAuth = ({ children }: any) => {
  const navigate = useNavigate();
  const { isAuth, isFetchingAuth } = useAuth();

  useEffect(() => {
    if (!isAuth && !isFetchingAuth) {
      navigate(ROUTES.Login, { replace: true });
    }
  }, [isAuth, navigate, isFetchingAuth]);

  if (!isAuth) {
    return null;
  }

  return children;
};

export { RequireAuth };