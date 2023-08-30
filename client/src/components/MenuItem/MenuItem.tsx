import { NavLink, useLocation } from 'react-router-dom';

import styles from './MenuItem.module.sass';
import { IMenuItemProps } from '../../types/menuItemProps';
import { CALENDAR_MODE as mode } from '../../constants/selectOptions';
import { ROUTES } from '../../constants/routes';

const MenuItem: React.FC<IMenuItemProps> = ({ children, to }) => {
  const location = useLocation();

  const setActive = () => {
    let isActive = location?.pathname.includes(to);

    if (to === `/${ROUTES.Schedule}${mode.week}/`) {
      const scheduleRoutes = [
        `/${ROUTES.Schedule}${mode.week}`, 
        `/${ROUTES.Schedule}${mode.month}`, 
        `/${ROUTES.Schedule}${mode.year}`
      ];

      isActive = scheduleRoutes.filter(route => location?.pathname.includes(route)).length > 0;
    }

    return isActive ? [styles['active-menu-link'], styles['menu-link']].join(' ') : styles['menu-link']
  }

  return (
    <div className={styles['menu-item']}>
      <NavLink
        to={to}
        className={setActive()}
      >
        {children}
      </NavLink>
    </div>
  )
};

export { MenuItem };