import styles from './PageHeader.module.sass';
import { IPageHeaderProps } from '../../types/pageHeaderProps';
 
const PageHeader: React.FC<IPageHeaderProps> = ({ children, align }) => {
  return (
    <div className={`${styles['page-header']} ${styles[align]}`}>
      {children}
    </div>
  )
};

export { PageHeader };