import styles from './PageContent.module.sass';
import { IPageContentProps } from '../../types/pageContentProps';

const PageContent: React.FC<IPageContentProps> = ({ children }) => {
  return (
    <div className={styles['page-content']}>
      {children}
    </div>
  )
};

export { PageContent };