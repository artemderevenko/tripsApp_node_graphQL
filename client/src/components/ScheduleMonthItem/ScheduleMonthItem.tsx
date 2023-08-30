import { useState, useEffect } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

import styles from './ScheduleMonthItem.module.sass';
import { ScheduleDaysHeader } from '../ScheduleDaysHeader';
import { IScheduleMonthItemProps } from '../../types/scheduleMonthItemProps';
import { CALENDAR_MODE as mode } from '../../constants/selectOptions';
import { ROUTES } from '../../constants/routes';

const ScheduleMonthItem: React.FC<IScheduleMonthItemProps> = ({ month, year }) => {
  const [daysMonth, setDaysMonth] = useState<(moment.Moment | null)[]>([]);

  useEffect(() => {
    getDaysMonth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const getDaysMonth = (): void => {
    const date = moment();
    const firstDayOfMonth = date.year(year).month(month.value).date(1);
    const firstDayOfWeek = firstDayOfMonth.day();
    const diff = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    const emptyArray = Array.from({ length: diff }, () => null);
    const daysInMonth = firstDayOfMonth.daysInMonth();

    const daysList = Array.from({ length: daysInMonth }, (_, index) => {
      const copyFirstDay = firstDayOfMonth.clone();
      return moment(copyFirstDay).add(index, 'day');
    });

    setDaysMonth([
      ...emptyArray,
      ...daysList,
    ]);
  };

  const getScrollClass = (): string => {
    return ``
  };

  const compareDates = (
    dateA: moment.Moment,
    dateB: moment.Moment,
    format: string,
  ): boolean => {
    return dateA.format(format) === dateB.format(format);
  }

  const getPath = (date: moment.Moment): string => {
    const dateString = date.format('DD/MM/YYYY');
    return `/${ROUTES.Schedule}${mode.week}?date=${encodeURIComponent(dateString)}`;
  }

  return (
    <div className={styles['schedule-month-item']}>
      <div className={styles['month-name']}>{month.label}</div>
      <ScheduleDaysHeader mode={'month'} />
      {
        daysMonth && daysMonth.length ?
          <div className={styles['month-days-list']}>
            {
              daysMonth.map((item, index) => {
                return item ?
                  <div
                    key={item.format()}
                    className={`${styles['month-days-item']} ${getScrollClass()}`}
                  >
                    <NavLink
                      className={`${styles['date-button']} ${compareDates(moment(), item, 'D-M-YY') ? styles['date-button-today'] : ''}`}
                      to={getPath(item)}
                    >
                      {item.format('D')}
                    </NavLink>
                  </div> :

                  <div
                    key={`empty-day-${month.value}-${index}`}
                    className={styles['month-days-item']}
                  />
              }
              )
            }
          </div> : null
      }
    </div>
  )
};

export { ScheduleMonthItem };