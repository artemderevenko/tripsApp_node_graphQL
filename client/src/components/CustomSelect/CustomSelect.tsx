import { useState, useRef } from 'react';

import styles from './CustomSelect.module.sass';
import { ICustomSelectProps } from '../../types/customSelectProps';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ISelectOption } from '../../types/selectOption';
import { DropdownOptions } from '../DropdownOptions';

const CustomSelect: React.FC<ICustomSelectProps> = ({
  placeholder,
  selectValue,
  selectOptions,
  positionDropDown,
  onChange,
  onBlur,
  textError,
  className,
}) => {

  const [optionsIsOpened, setOptionsIsOpened] = useState<boolean>(false);

  const checkError = (): void => {
    if (onBlur) { onBlur() }
  }

  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, setOptionsIsOpened, optionsIsOpened, checkError);

  const handleOpenedOptions = (): void => {
    setOptionsIsOpened(!optionsIsOpened);
  }

  const changeOption = (item: ISelectOption): void => {
    onChange(item);
    setOptionsIsOpened(false);
  }

  const checkSelectedClass = (item: ISelectOption | null): boolean => {
    return selectValue && selectValue.value && item && item.value && item.value === selectValue.value ? true : false
  }

  const classList = `${styles['custom-select']} ${optionsIsOpened ? styles['is-opened'] : ''} ${textError ? styles['is-error'] : ''}`;

  return (
    <div className={`${styles['custom-select-wrap']} ${className || ''}`}>
      <div
        className={classList}
        ref={wrapperRef}
      >
        <div className={styles['select-box']} onClick={handleOpenedOptions}>
          {
            selectValue ?
              <div className={styles['select-box-value']}>{selectValue.label}</div> : null
          }
          <div className={`${styles.arrow} ${optionsIsOpened ? styles['arrow-down'] : styles['arrow-up']}`}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="1024px" height="1024px" viewBox="0 0 1024 1024" enableBackground="new 0 0 1024 1024">
              <rect fill="none" width="1024" height="1024" />
              <path d="M411.197,833L26.523,408.205c-56.186-97.145-10.63-175.782,101.79-175.782h769.301  c112.468,0,158.121,78.637,101.789,175.782L614.777,833C557.235,893.85,473.093,903.579,411.197,833z" />
            </svg>
          </div>
        </div>
        {
          !textError ?
            <div
              className={`${styles['placeholder']} ${optionsIsOpened || (selectValue && selectValue.value) ? styles['placeholder-up'] : ''}`}
            >
              {placeholder}
            </div> : null
        }
        {
          textError ?
            <div
              className={styles['select-error']}
            >
              {textError}
            </div> : null
        }
        {optionsIsOpened ?
          <DropdownOptions
            positionDropDown={positionDropDown}
            options={selectOptions}
            changeOption={changeOption}
            checkSelectedClass={checkSelectedClass}
          /> : null
        }
      </div>
    </div>
  )
};

export { CustomSelect };