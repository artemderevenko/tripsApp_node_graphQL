import { NavLink } from 'react-router-dom';

import styles from './AuthForm.module.sass';
import { ROUTES } from '../../constants/routes';
import { CustomInput } from '../CustomInput';
import { CustomButton } from '../CustomButton';
import { useInput } from '../../hooks/useInput';
import { IAuthFormProps } from '../../types/authFormProps';

const AuthForm: React.FC<IAuthFormProps> = ({ title, handleClick, buttonName, formType }) => {
  const email = useInput({ 
    initialValue: '', 
    name: 'Email',
    validations: {
      isEmpty: true,
      isEmail: true
    }
  });

  const password = useInput({ 
    initialValue: '', 
    name: 'Password',
    validations: {
      isEmpty: true,
      minLength: 8
    }
  });

  const clickButton = () => {
    if (email.isValid && email.value && password.isValid && password.value) {
      return handleClick(email.value, password.value)
    } 
    
    if (email.isValid && !email.value) {
      email.onCheckError();
    }

    if (password.isValid && !password.value) {
      password.onCheckError();
    }
  }

  return (
    <div className={styles['page-wrap']}>
      <div className={styles['auth-form']}>
        <div className={styles['title']}>{title}</div>
        <div className={styles['input-row']}>
          <CustomInput
            type="email"
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onBlur}
            placeholder={email.name}
            textError={email.textError}
          />
        </div>
        <div className={styles['input-row']}>
          <CustomInput
            type="password"
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
            placeholder={password.name}
            textError={password.textError}
          />
        </div>
        <div className={styles['button-row']}>
          <CustomButton
            onClick={clickButton}
            buttonText={buttonName}
            type={'confirm'}
          />
        </div>
        {
          formType === 'login' ?
            <div className={styles['redirect-box']}>
              Don't have an account yet? <NavLink to={ROUTES.Register}> Sign up </NavLink> now!
            </div> : null
        }
        {
          formType === 'register' ?
            <div className={styles['redirect-box']}>
              Already have an account? <NavLink to={ROUTES.Login}> Log in</NavLink>
            </div> : null
        }
      </div>
    </div>
  )
};

export { AuthForm };