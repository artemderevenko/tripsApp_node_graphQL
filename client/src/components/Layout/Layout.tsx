import { Outlet } from 'react-router-dom';

import { Sitebar } from '../Sitebar';
import styles from './Layout.module.sass';

const Layout: React.FC = () => {
  return (
    <>
      <Sitebar />
      <div className={styles.container}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </>
  )
};

export { Layout };