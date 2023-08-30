import React from 'react';
import moment from 'moment';

import styles from './ScheduleDayItem.module.sass';
import { useAppdSelector } from '../../hooks/reduxHook';
import { IHoliday } from '../../types/holiday';
import { IScheduleDayItemProps } from '../../types/scheduleDayItemProps';

const ScheduleDayItem: React.FC<IScheduleDayItemProps> = ({ date }) => {

  const compareDates = (
    dateA: moment.Moment,
    dateB: moment.Moment,
    format: string,
  ): boolean => {
    return dateA.format(format) === dateB.format(format);
  }

  const getTodayClass = (date: moment.Moment): boolean => {
    const today = moment();
    return compareDates(today, date, 'D-M-YY');
  }

  const getHolidayList = () => {
    const monthNumber = date.month();
    const holidaysMonth: Array<{}> | IHoliday[] = holidays[monthNumber];
    let holidayList: IHoliday[] = [];

    if (Array.isArray(holidaysMonth)) {
      holidaysMonth.forEach((holiday) => {
        const holidayItem = holiday as IHoliday;
        if (compareDates(moment(holidayItem.date), date, 'D-M')) {
          holidayList = [...holidayList, holidayItem]
        }
      });
    };

    return holidayList;
  }

  const monthDate = date.format('D');
  const holidays = useAppdSelector(state => state.holidays.list);
  const isToday = getTodayClass(date);
  const holidayList = getHolidayList();

  return (
    <div className={styles['day']}>
      <div className={styles['month-date']}>
        <div className={`${styles['month-date-button']} ${isToday ? styles['month-date-button-today'] : ''}`}>
          {monthDate}
        </div>
        <div className={styles['events-list']}>
          {
            holidayList && holidayList.length ?
              holidayList.map((holiday) => (<div key={holiday.date} className={styles['event-holiday']}>{holiday.name}</div>)) : null
          }
        </div>
      </div>
    </div>
  )
};

export { ScheduleDayItem };