import { useLocation } from 'react-router-dom';

import { AuthForm } from '../components/AuthForm';
import { useAuthContext } from '../hooks/useAuthContext';
import { ROUTES } from '../constants/routes';

const Login: React.FC = () => {
  const { signIn } = useAuthContext();
  const location = useLocation();

  const fromPage = location?.state?.from?.pathname || `/${ROUTES.Clients}`;

  const handleLogin = (email: string, password: string): void => {
    signIn(email, password, fromPage)
  }

  return (
    <>
      <AuthForm
        title={'Log in to your account'}
        handleClick={handleLogin}
        buttonName={'Sign in'}
        formType={'login'}
      />
    </>
  )
};

export default Login;