import { ReactNode } from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

import styles from './ScheduleWeekRow.module.sass';
import { ScheduleDayItem } from '../ScheduleDayItem';
import { ITour } from '../../types/tour';
import { ROUTES } from '../../constants/routes';
import { IScheduleWeekRowProps } from '../../types/scheduleWeekRowProps';

const ScheduleWeekRow: React.FC<IScheduleWeekRowProps> = ({tours, daysWeek, className}) => {

  const getTourScheduleStyle = (weekTour: ITour): React.CSSProperties => {
    const startDate = moment(weekTour?.startDate, 'DD/MM/YYYY', true);
    const endDate = moment(weekTour?.endDate, 'DD/MM/YYYY', true);
    const schedule = [...daysWeek].map(item => {
      return moment(item).isSameOrBefore(endDate) && moment(item).isSameOrAfter(startDate) ? 1 : 0;
    })

    const firstOneIndex = schedule.indexOf(1) >= 0 ? schedule.indexOf(1) + 1 : 0;
    const lastOneIndex = schedule.lastIndexOf(1) >= 0 ? schedule.lastIndexOf(1) + 1 : 0;

    if (!firstOneIndex || !lastOneIndex) { return {} }

    return {
      width: `${100 / 7 * (lastOneIndex - firstOneIndex + 1)}%`,
      marginLeft: `${100 / 7 * (firstOneIndex - 1)}%`,
      marginRight: `${100 / 7 * (7 - lastOneIndex)}%`,
      backgroundColor: `${weekTour.color}`
    }
  }

  const getTourSchedule = (): ReactNode => {
    const weekTours = tours.filter(tour => {
      const startDate = moment(tour?.startDate, 'DD/MM/YYYY', true);
      const endDate = moment(tour?.endDate, 'DD/MM/YYYY', true);
      return moment(startDate).isSameOrBefore(daysWeek[daysWeek.length - 1]) && moment(endDate).isSameOrAfter(daysWeek[0])
    });

    return (<div className={styles['tour-schedule']}>
      {
        weekTours.map(weekTour => (<NavLink
          key={weekTour.id}
          to={`/${ROUTES.TourDetails}${weekTour.id}`}
          style={getTourScheduleStyle(weekTour)}
          className={styles['tour-schedule-item']}
        >
          {weekTour.name}
        </NavLink>))
      }
    </div>)
  }

  return (
    <div className={`${styles['schedule-week-row']} ${className || ''}`}>
      <div className={styles['schedule-week-content']}>
        {
          daysWeek.map(item => (
            <ScheduleDayItem
              key={item.format()}
              date={item}
            />))
        }
      </div>
      {getTourSchedule()}
    </div>
  )
};

export { ScheduleWeekRow };