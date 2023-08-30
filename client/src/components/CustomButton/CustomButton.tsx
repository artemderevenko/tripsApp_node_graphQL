import { NavLink } from 'react-router-dom';

import styles from './CustomButton.module.sass';
import { ICustomButtonProps } from '../../types/customButtonProps';

const CustomButton: React.FC<ICustomButtonProps> = ({ 
  buttonText, 
  onClick, 
  className, 
  type = 'confirm', 
  disable, 
  icon, 
  linkPath,
  id=''
}) => {
  return (
    linkPath ?

      <NavLink
        id={id}
        to={linkPath}
        className={`${styles['custom-button']} ${className || ''} ${styles[type]} ${disable ? styles['disable'] : ''}`}
      >
        {
          icon ?
            <div className={styles['icon']}>
              {icon}
            </div> : null
        }
        {buttonText}
      </NavLink> :

      <button
        className={`${styles['custom-button']} ${className || ''} ${styles[type]} ${disable ? styles['disable'] : ''}`}
        onClick={onClick}
        id={id}
      >
        {
          icon ?
            <div className={styles['icon']}>
              {icon}
            </div> : null
        }
        {buttonText}
      </button>
  )
};

export { CustomButton };