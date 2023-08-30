import { useState, useEffect } from 'react';
import moment from 'moment';

import styles from './ScheduleYear.module.sass';
import stylesPagination from '../ScheduleDaysPagination/ScheduleDaysPagination.module.sass';
import { MONTHS_LIST as monthsList } from '../../constants/monthsList';
import { ScheduleDaysPagination } from '../ScheduleDaysPagination';
import { ScheduleMonthItem } from '../ScheduleMonthItem';

const ScheduleYear: React.FC = () => {
  const [year, setYear] = useState<number | ''>('');
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);

  const getStartYear = (): void => {
    const currentDate = moment();
    setYear(currentDate.year());
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 300);
  }

  useEffect(() => {
    getStartYear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollDirection = (direction: string, nextYear: number) => {
    setScrollDirection(direction);

    setTimeout(() => {
      setScrollDirection('');
      setYear(nextYear);
    }, 150);
  };

  const handlePrev = (): void => {
    handleScrollDirection('right', year ? year - 1 : moment().year());
  }

  const handleNext = (): void => {
    handleScrollDirection('left', year ? year + 1 : moment().year());
  }

  const getScrollClass = (): string => {
    return `${scrollDirection === 'right' ? styles['scroll-right'] : ''} ${scrollDirection === 'left' ? styles['scroll-left'] : ''} ${fadeAnimation ? styles['fade'] : ''}`
  }

  const backToToday = (): void => {
    getStartYear()
  }

  return (
    <>
      <div className={styles['note']}>
        <svg className={styles['note-icon']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" fill="#f8b952" />
        </svg>
        This grid does not show tour schedules. Select a date to view detailed information.
      </div>
      <div className={styles['schedule-year']}>
        <ScheduleDaysPagination
          handlePrev={handlePrev}
          handleNext={handleNext}
          scheduleTitle={`${year}`}
          backToToday={backToToday}
          className={stylesPagination['schedule-year-pagination']}
          titleClassName={`${fadeAnimation ? stylesPagination['fade'] : ''}`}
        />
        {
          monthsList && monthsList.length ?
            <div className={styles['schedule-year-wrap']}>
              <div className={`${styles['schedule-year-content']} ${getScrollClass()}`}>
                {
                  monthsList.map(month => (
                    <ScheduleMonthItem
                      key={`month-${month.value}`}
                      month={month}
                      year={year || moment().year()}
                    />
                  ))
                }
              </div>
            </div> : null
        }
      </div>
    </>
  )
};

export { ScheduleYear };