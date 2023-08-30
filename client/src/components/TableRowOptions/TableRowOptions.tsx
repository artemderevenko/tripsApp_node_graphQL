import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './TableRowOptions.module.sass';
import { ITableRowOptionsProps } from '../../types/tableRowOptionsProps';

const TableRowOptions: React.FC<ITableRowOptionsProps> = ({ visible, optionsList }) => {
  const [isVisibleList, setIsVisibleList] = useState<boolean>(false);

  if (!optionsList || !optionsList.length) { return null }

  return (
    <div
      className={`${styles['options-wrap']} ${visible ? styles['visible'] : ''}`}
      onMouseEnter={() => setIsVisibleList(true)}
      onMouseLeave={() => setIsVisibleList(false)}
    >
      <div className={styles['options-icon']}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512">
          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
        </svg>
      </div>
      <div className={`${styles['options-list']} ${isVisibleList ? styles['options-list-visible'] : ''}`}>
        {
          optionsList.map(option => {
            return option.linkPath ?

              (<NavLink
                key={option.label}
                to={option.linkPath}
                className={`${styles['options-list-item']} ${option.className ? styles[option.className] : ''}`}
              >
                {option.label}
              </NavLink>) :

              (<div
                key={option.label}
                className={`${styles['options-list-item']} ${option.className ? styles[option.className] : ''}`}
                onClick={option.onClick}
              >
                {option.label}
              </div>)
          })
        }
      </div>
    </div>
  )
};

export { TableRowOptions };