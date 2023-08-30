import styles from './TableHeader.module.sass';
import { ITableHeaderProps } from '../../types/tableHeaderProps';
 
const TableHeader: React.FC<ITableHeaderProps> = ({ children }) => {
  return (
    <div className={styles['table-header']}>
      { children }
    </div>
  )
};

export { TableHeader };