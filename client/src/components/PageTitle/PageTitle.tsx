import styles from './PageTitle.module.sass';
import { IPageTitleProps } from '../../types/pageTitleProps';

const PageTitle: React.FC<IPageTitleProps> = ({ children }) => {
  return (
    <div className={styles['page-title']}>
      {children}
    </div>
  )
};

export { PageTitle };