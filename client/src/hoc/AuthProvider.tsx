import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { IAuthProviderProps } from '../types/authProviderProps';

import { useAppDispatch } from '../hooks/reduxHook';
import { setUser, removeUser, changefetchStatus } from '../store/slices/userSlice';
import { ROUTES } from '../constants/routes';
import { useNotify } from '../hooks/useNotify';
import { IAuthContext } from '../types/authContext';
import { useAuth } from '../hooks/useAuth';

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { notify, setNotify } = useNotify();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      checkAuthStatus()
    }
  }, [navigate]);

  const checkAuthStatus = () => {
    dispatch(changefetchStatus(true));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, refreshToken, uid } = user;

        dispatch(setUser({
          email: email,
          token: refreshToken,
          id: uid,
          isFetchingAuth: false
        }));
      } else {
        dispatch(removeUser());
      }
    });
  }

  const signIn = (email: string, password: string, fromPage: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const { email, refreshToken, uid } = user;

        dispatch(setUser({
          email: email,
          token: refreshToken,
          id: uid,
          isFetchingAuth: false
        }));

        setNotify({ isActive: false, type: '', message: '' });
        navigate(fromPage || `/${ROUTES.Clients}`);

      })
      .catch((error) => {
        const errorCode = error.code;

        let message = 'Something went wrong. Please try again later';

        if (errorCode === 'auth/user-not-found') {
          message = 'User is not found'
        }

        if (errorCode === 'auth/wrong-password') {
          message = 'Authorisation error. Check your email or password'
        }

        if (errorCode === 'auth/too-many-requests') {
          message = 'Access to this account has been temporarily disabled due to many failed login attempts. You can try again later'
        }

        if (notify.message !== message) {
          setNotify({ isActive: true, type: 'error', message: message });
        }
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate(ROUTES.Login, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <AuthContext.Provider value={{ signIn, logOut }}>
    {children}
  </AuthContext.Provider>
};

export { AuthProvider };