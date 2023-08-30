import { useState, useRef } from 'react';

import styles from './CustomButtonSearchSelect.module.sass';
import { TCustomButtonSearchSelectProps } from '../../types/customButtonSearchSelect';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ISelectOption } from '../../types/selectOption';
import { useFilteredList } from '../../hooks/useFilteredList';
import { DropdownOptions } from '../DropdownOptions';

const CustomButtonSearchSelect: React.FC<TCustomButtonSearchSelectProps> = ({
  icon,
  label,
  selectOptions,
  positionDropDown,
  onChange,
  className,
  disable,
  onDisableAction,
  id='',
}) => {

  const [optionsIsOpened, setOptionsIsOpened] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [activeSearchValue, setActiveSearchValue] = useState<string>('');
  const filteredOptions = useFilteredList(selectOptions, activeSearchValue, ['label']);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const clearSearchValue = (): void => {
    setSearchValue('');
    setActiveSearchValue('');
  }

  useOutsideClick(wrapperRef, setOptionsIsOpened, optionsIsOpened, clearSearchValue);

  const handleOpenedOptions = (): void => {
    if (disable) {
      if (onDisableAction) {
        onDisableAction()
      }
    } else {
      setOptionsIsOpened(!optionsIsOpened)
    }
  }

  const changeOption = (item: ISelectOption): void => {
    onChange(item);
    setOptionsIsOpened(false);
    clearSearchValue();
  }

  const searchClients = () => {
    setActiveSearchValue(searchValue)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      searchClients()
    }
  }

  return (
    <div
      className={`${className || ''} ${styles['custom-button-search-select']} ${optionsIsOpened ? styles['is-opened'] : ''}`}
      ref={wrapperRef}
      id={id}
    >
      <div className={styles['button-box']} onClick={handleOpenedOptions}>
        {
          icon ?
            <div className={`${styles['button-icon']} ${optionsIsOpened ? styles['button-icon-hide'] : ''}`}>
              {icon}
            </div> : null
        }
        <div className={`${styles['box-value']} ${icon ? styles['box-value-is-icon'] : ''} ${optionsIsOpened ? styles['box-value-hide'] : ''}`}>
          {label}
        </div>
        <div className={`${styles.arrow} ${optionsIsOpened ? styles['arrow-down'] : styles['arrow-up']}`}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="1024px" height="1024px" viewBox="0 0 1024 1024" enableBackground="new 0 0 1024 1024">
            <rect fill="none" width="1024" height="1024" />
            <path d="M411.197,833L26.523,408.205c-56.186-97.145-10.63-175.782,101.79-175.782h769.301  c112.468,0,158.121,78.637,101.789,175.782L614.777,833C557.235,893.85,473.093,903.579,411.197,833z" />
          </svg>
        </div>
      </div>
      {
        optionsIsOpened ?
          <div className={styles['input-search-wrap']}>
            <div className={styles['input-search-icon']} onClick={searchClients}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="25px" height="25px">
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
              </svg>
            </div>
            <input
              className={styles['input-search']}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus />
          </div> : null
      }
      {optionsIsOpened ?
        <DropdownOptions
          positionDropDown={positionDropDown}
          options={filteredOptions}
          changeOption={changeOption}
        />
        : null
      }
    </div>
  )
};

export { CustomButtonSearchSelect };