import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useAppDispatch } from '../hooks/reduxHook';
import { setUser } from '../store/slices/userSlice';
import { AuthForm } from '../components/AuthForm';
import { ROUTES } from '../constants/routes';
import { useNotify } from '../hooks/useNotify';

const Register: React.FC = () => {
  const { notify, setNotify } = useNotify();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string): void => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const { email, refreshToken, uid } = user;

        dispatch(setUser({
          email: email,
          token: refreshToken,
          id: uid,
          isFetchingAuth: false
        }));

        setNotify({isActive: false, type: '', message: ''});
        navigate(`/${ROUTES.Clients}`);

      })
      .catch((error) => {
        const errorCode = error.code;

        let message = 'Something went wrong. Please try again later';

        if (errorCode === 'auth/email-already-in-use') {
          message = 'Email already exists'
        }

        if (notify.message !== message) {
          setNotify({isActive: true, type: 'error', message: message});
        }
      });
  }

  return (
    <>
      <AuthForm
        title={'Sign up account'}
        handleClick={handleRegister}
        buttonName={'Sign up'}
        formType={'register'}
      />
    </>
  )
};

export default Register;