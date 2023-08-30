import { useState, useEffect } from 'react';

import styles from './SeatLayoutMinibus19.module.sass';
import { SeatLayoutButton } from '../SeatLayoutButton';
import { useAppDispatch, useAppdSelector } from '../../hooks/reduxHook';
import { useExcludedListIds } from '../../hooks/useExcludedListIds';
import { ISelectOption } from '../../types/selectOption';
import { changeSeatNumber } from '../../store/slices/tourSlice';

const SeatLayoutMinibus19: React.FC = () => {
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);
  const [touristsIds, setTouristsIds] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { touristsList } = useAppdSelector(state => state.tour);
  const excludedTourists = useExcludedListIds(touristsList, touristsIds, 'clientId');

  useEffect(() => {
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const touristsIds = touristsList.filter(tourist => tourist.seatNumber).map(item => item.clientId);
    setTouristsIds(touristsIds);
  }, [touristsList]);

  const seatsList = Array.from({ length: 19 }, (_, index) => index + 1);

  const getTouristOptions = (): ISelectOption[] => {
    if (excludedTourists && excludedTourists.length) {
      const options = excludedTourists.map(tourist => ({
        value: tourist.clientId,
        label: `${tourist.firstName} ${tourist.lastName} ${tourist.middleName} (${tourist.passport})`
      }));

      return [
        { value: '', label: 'No tourist' },
        ...options
      ];

    } else { return [{ value: '', label: 'No tourist' }] }
  }

  const setSeat = (clientId: string | number, seatNumber: number | null) => {
    dispatch(changeSeatNumber({ clientId: `${clientId}`, seatNumber }))
  }

  const checkSeatReserved = (seat: number) => {
    const seatReserved = touristsList.filter(tourist => tourist.seatNumber === seat);
    return seatReserved && seatReserved.length > 0;
  }

  return (
    <div className={`${styles['minibus-19']} ${fadeAnimation ? styles['fade'] : ''} `}>
      <div className={styles['seats-wrap']}>
        {
          seatsList.map(seat => (
            <div
              key={`minibus-19-${seat}`}
              className={`${styles['seat']} ${styles[`seat-${seat}`]}`}
            >
              <SeatLayoutButton
                label={`${seat}`}
                selectOptions={getTouristOptions()}
                onChange={(option) => setSeat(option.value, seat)}
                className={''}
                positionDropDown='left'
                isSeatReserved={checkSeatReserved(seat)}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
};

export { SeatLayoutMinibus19 };