import { useState, useRef } from 'react';

import styles from './SeatLayoutButton.module.sass';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ISelectOption } from '../../types/selectOption';
import { DropdownOptions } from '../DropdownOptions';
import { ISeatLayoutButtonProps } from '../../types/seatLayoutButtonProps';

const SeatLayoutButton: React.FC<ISeatLayoutButtonProps> = ({
  label,
  selectOptions,
  positionDropDown,
  onChange,
  className,
  isSeatReserved,
}) => {

  const [optionsIsOpened, setOptionsIsOpened] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, setOptionsIsOpened, optionsIsOpened);

  const handleOpenedOptions = (): void => {
    setOptionsIsOpened(!optionsIsOpened)
  }

  const changeOption = (item: ISelectOption): void => {
    onChange(item);
    setOptionsIsOpened(false);
  }

  return (
    <div
      className={`${className || ''} ${styles['seat-layout-button']} ${isSeatReserved ? styles['reserved'] : ''}`}
      ref={wrapperRef}
    >
      <div className={styles['label']} onClick={handleOpenedOptions}>
        {label}
      </div>
      {optionsIsOpened ?
        <DropdownOptions
          positionDropDown={positionDropDown}
          options={selectOptions}
          changeOption={changeOption}
          className={styles['seat-layout-dropdown']}
        /> : null
      }
    </div>
  )
};

export { SeatLayoutButton };